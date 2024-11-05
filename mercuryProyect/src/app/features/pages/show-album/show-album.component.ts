import { Component, signal } from '@angular/core';
import { Album, Genres } from '../../../auth/interfaces/album.interface';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../../auth/interfaces/song.interface';
import { GetGenresService } from '../../../shared/generalServices/get-genres.service';
import { NgFor } from '@angular/common';
import { GetSongsService } from '../../../shared/artistServices/get-songs.service';
import { AlbumAPIService } from '../../../API/album/album-api.service';
import { SongAPIService } from '../../../API/song/song-api.service';
import { MusicPlayerService } from '../../../shared/generalServices/music-player.service';

@Component({
  selector: 'app-showAlbum',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-album.component.html',
})
export class ShowAlbumComponent {
  idAlbum: string = ''
  album = signal<any>(null)
  songs = signal<any[]>([])

  constructor(private route: ActivatedRoute,
    private getGenresService: GetGenresService,
    private albumAPIService: AlbumAPIService,
    private songAPIService: SongAPIService,
    private musicPlayerService: MusicPlayerService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idAlbum = params['id'];
      this.loadAlbum(this.idAlbum); 
      this.loadSongsOfAlbum(this.idAlbum)

    });

  }

  loadAlbum(idAlbum: string) {
    this.albumAPIService.getAlbumById(idAlbum).subscribe({
      next: (response) => {
        console.log(response)
        this.album.set(response)
      }
    })
  }

  loadSongsOfAlbum(idAlbum: string) {
    this.songAPIService.getSongsFromAlbum(idAlbum).subscribe({
        next: (response) => {
          console.log("eee: ", response.data)
            this.songs.set(response.data)
        }
    })
  }

  onPlaySong(song: Song) {
    this.musicPlayerService.setCurrentSong(song)
  }

  getGenreByIdGenre(idGenre: string): Genres {
    const genre = this.getGenresService.getGenreByIdGenre(idGenre)
    return genre
  }
}
