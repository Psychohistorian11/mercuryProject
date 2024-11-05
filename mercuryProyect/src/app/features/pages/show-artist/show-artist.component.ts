import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArtistsService } from '../../../shared/artistServices/get-artists.service';
import { Artist, User } from '../../../auth/interfaces/user.interface';
import { GetSongsService } from '../../../shared/artistServices/get-songs.service';
import { Song } from '../../../auth/interfaces/song.interface';
import { NgFor } from '@angular/common';
import { GetAlbumsService } from '../../../shared/artistServices/get-albums.service';
import { Album, Genres } from '../../../auth/interfaces/album.interface';
import { GetGenresService } from '../../../shared/generalServices/get-genres.service';
import { PlaySongService } from '../../../shared/generalServices/play-song.service';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { ArtistAPIService } from '../../../API/artist/artist-api.service';
import { AlbumAPIService } from '../../../API/album/album-api.service';
import { SongAPIService } from '../../../API/song/song-api.service';
import { GetTokenService } from '../../../shared/generalServices/get-token.service';
import { MusicPlayerService } from '../../../shared/generalServices/music-player.service';

@Component({
  selector: 'app-showArtist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-artist.component.html'
})
export class ShowArtistComponent implements OnInit {
  token: any
  idArtist: string = '';
  artist = signal<any>(null);
  songs = signal<any[]>([]);
  albums = signal<any[]>([])
  albumNames = signal<{ [songId: string]: string }>({});


  constructor(
    private route: ActivatedRoute,
    private getToken : GetTokenService,
    private getAlbumsService: GetAlbumsService,
    private getGenreService: GetGenresService,
    private artistAPIService: ArtistAPIService,
    private albumAPIService: AlbumAPIService,
    private songAPIService: SongAPIService,
    private router: Router,
    private musicPlayService: MusicPlayerService

  ) {
  }

  ngOnInit() {
    this.token = this.getToken.getToken()
    this.route.params.subscribe(params => {
      this.idArtist = params['id'];

      this.loadArtist(this.idArtist);
      this.loadSongsOfArtist(this.idArtist)
      this.loadAlbumsOfArtist(this.idArtist)

    });

  }

  loadArtist(idArtist: string) {
    this.artistAPIService.getArtistById(idArtist).subscribe({
      next: (response) => {
        this.artist.set(response)
      },
      error: (error) => {
        console.log("Error al traer al artista: ", error)
      }
    })
  }

  loadSongsOfArtist(idArtist: string) {
    this.songAPIService.getSongsFromArtist(idArtist).subscribe({
      next: (response) => {
        this.songs.set(response.data)
      },
      error: (error) => {
        console.log("Error al traer las canciones: ", error)
      }
    })
    this.loadAlbumNames();

  }

  loadAlbumsOfArtist(idArtist: string) {
    this.albumAPIService.getAlbumByArtistId(idArtist).subscribe({
      next: (response) => {
        this.albums.set(response.data)
      },
      error: (error) => {
        console.log("Error al taer los albums: ", error)
      }
    })
  }

  loadAlbumNames() {
    const newAlbumNames: { [songId: string]: string } = {};
    this.songs().forEach(song => {
      if (song.idAlbum) {
        const album = this.onGetAlbumName(song.idAlbum);
        newAlbumNames[song.id] = album ? album.name : 'Sin álbum';
      } else {
        newAlbumNames[song.id] = 'Sin álbum';
      }
    });
    this.albumNames.set(newAlbumNames);
  }


  onPlaySong(song: Song) {
    this.musicPlayService.setCurrentSong(song)
    //this.playSongService.setAudio(song.audio)
    //this.playSongService.setImageSupabase(song.image)
  }

  onSelectAlbum(album: any) {
    if (this.token.role === 'artist') {
      this.router.navigate([`/home/artist/${this.token.sub}/album/${album.album_id}`])
    } else {
      this.router.navigate([`/home/${this.token.sub}/album/${album.album_id}`])
    }
  }

  onGetAlbumName(idAlbum: string[]): Album | null {
    const albums = this.getAlbumsService.getAlbumsByIds(idAlbum);
    console.log(albums)
    return albums && albums.length > 0 ? albums[0] : null;
  }


  getGenreByIdGenre(idGenre: string): Genres {
    return this.getGenreService.getGenreByIdGenre(idGenre)
  }
}
