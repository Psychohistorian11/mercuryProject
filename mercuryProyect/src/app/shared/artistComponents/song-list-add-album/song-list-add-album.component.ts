import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SongAPIService } from '../../../API/song/song-api.service';
import { GetTokenService } from '../../generalServices/get-token.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-song-list-add-album',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './song-list-add-album.component.html',
  styleUrl: './song-list-add-album.component.css'
})
export class SongListAddAlbumComponent {

  token: any
  songs = signal<any[]>([]);
  @Output() songSelectedToAdd = new EventEmitter<any>();
  @Output() songSelectedToRemove = new EventEmitter<any>();
  addedSongs = new Set<string>();


  constructor(private songAPIservice: SongAPIService,
              private getToken: GetTokenService
  ){
      this.token = this.getToken.getToken()
      this.getSongsByCurrentArtist()
  }

  handleDblClick(song: any) {
    // Permitir que el reproductor reproduzca una nueva canción
    //this.playSongService.setAudioPlaying(false);

    //this.playSongService.setAudio(song.audio);
    //this.playSongService.setImageSupabase(song.image);
  }


  onAddToAlbumSong(song: any) {
    this.songSelectedToAdd.emit(song);
    this.addedSongs.add(song.song_id);
  }

  onRemoveToAlbumSong(song: any) {
    this.songSelectedToRemove.emit(song);
    this.addedSongs.delete(song.song_id)
  }

  isSongAdded(song: any): boolean {
    return this.addedSongs.has(song.song_id);
  }

  getSongsByCurrentArtist() {
    this.songAPIservice.getSongsFromArtist(this.token.sub).subscribe({
      next: (response) => {
        console.log(response.data[0])
        this.songs.set(response.data)
          
      },
      error: (error) => {
          console.log(error)
      }
    })
  }
}
