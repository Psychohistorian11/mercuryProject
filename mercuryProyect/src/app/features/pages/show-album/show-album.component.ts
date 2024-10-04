import { Component, signal } from '@angular/core';
import { Album, Genres } from '../../../auth/interfaces/album.interface';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../../auth/interfaces/song.interface';
import { GetGenresService } from '../../../shared/generalServices/get-genres.service';
import { NgFor } from '@angular/common';
import { GetSongsService } from '../../../shared/artistServices/get-songs.service';
import { SongsArtistComponent } from '../songs-artist/songs-artist.component';
import { GetAlbumsService } from '../../../shared/artistServices/get-albums.service';
import { PlaySongService } from '../../../shared/generalServices/play-song.service';

@Component({
  selector: 'app-showAlbum',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-album.component.html'
})
export class ShowAlbumComponent {
  idAlbum: string = ''
  album = signal<Album | null>(null)
  songs = signal<Song[]>([])

  constructor(private route: ActivatedRoute,
              private getGenresService: GetGenresService,
              private getSongsService: GetSongsService,
              private getAlbumService: GetAlbumsService,
              private playSongService: PlaySongService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idAlbum = params['id'];
      this.loadAlbum(this.idAlbum);
      this.loadSongsOfAlbum(this.idAlbum)

    });

  }
  loadAlbum(idAlbum: string){
      const album = this.getAlbumService.getAlbumById(idAlbum)
      this.album.set(album)
  }

  loadSongsOfAlbum(idAlbum: string){
        const songs = this.getSongsService.getSongsByIdAlbum(idAlbum)
        this.songs.set(songs)
  }


  onPlaySong(song: Song){
    this.playSongService.setAudio(song.audio)
    this.playSongService.setImageSupabase(song.image)
  }

  getGenreByIdGenre(idGenre: string): Genres{
        const genre = this.getGenresService.getGenreByIdGenre(idGenre)
        return genre
  }
}
