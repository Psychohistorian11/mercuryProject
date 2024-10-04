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

@Component({
  selector: 'app-showArtist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-artist.component.html'
})
export class ShowArtistComponent implements OnInit {
  private user: User
  idArtist: string = ''; 
  artist = signal<Artist | null>(null); 
  songs = signal<Song[]>([]);
  albums = signal<Album[]>([])
  albumNames = signal<{ [songId: string]: string }>({}); 


  constructor(
    private route: ActivatedRoute,
    private getArtistsService: GetArtistsService,
    private getSongsService: GetSongsService,
    private getAlbumsService: GetAlbumsService,
    private getGenreService: GetGenresService,
    private playSongService: PlaySongService,
    private getUserService: GetUserService,
    private router: Router,
  ) {
    this.user = getUserService.getUser()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idArtist = params['id'];
      this.loadArtist(this.idArtist);  
      this.loadSongsOfArtist(this.idArtist)
      this.loadAlbumsOfArtist(this.idArtist)
     
    });

  }



  loadArtist(idArtist: string) {
    const artist = this.getArtistsService.getArtistById(idArtist);
    this.artist.set(artist); 
  }

  loadSongsOfArtist(idArtist: string){
    const songs = this.getSongsService.getSongsByIdArtist(idArtist)
    this.songs.set(songs)
    this.loadAlbumNames(); 

  }

  loadAlbumsOfArtist(idArtist: string){
    const albums = this.getAlbumsService.getAlbumsByIdArtist(idArtist)
    this.albums.set(albums)
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
    this.albumNames.set(newAlbumNames); // Actualizamos el signal
  }


  onPlaySong(song: Song){
    this.playSongService.setAudio(song.audio)
    this.playSongService.setImageSupabase(song.image)
  }

  onSelectAlbum(album: Album){
    if(this.user.role === 'artist'){
            this.router.navigate([`/home/artist/${this.user.id}/album/${album.id}`])
    }else{
      this.router.navigate([`/home/${this.user.id}/album/${album.id}`])
    }
  }

  onGetAlbumName(idAlbum: string[]): Album | null {
    const albums = this.getAlbumsService.getAlbumsByIds(idAlbum);
    console.log(albums)
    return albums && albums.length > 0 ? albums[0] : null;
  }
  

  getGenreByIdGenre(idGenre: string): Genres{
      return this.getGenreService.getGenreByIdGenre(idGenre)
  }
}
