import { Component, signal } from '@angular/core';
import { Song } from '../../../auth/interfaces/song.interface';
import { PlaySongService } from '../../generalServices/play-song.service';
import { MusicPlayerService } from '../../generalServices/music-player.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-song-info-icon-artist',
  standalone: true,
  imports: [NgClass],
  templateUrl: './song-info-icon-artist.component.html',
  styleUrls: ['./song-info-icon-artist.component.css']
})
export class SongInfoIconArtistComponent {

  currentSong = signal<any>(null)


  constructor(private musicPlayerService: MusicPlayerService
  ) {

    this.musicPlayerService.getCurrentSong().subscribe({
      next: (data) => {
          this.currentSong.set(data)
      }
    })

  }
  isImageRotating(): boolean {
    // Asegúrate de usar la ruta completa y correcta de la imagen predeterminada
    const defaultImagePath = './../../../../assets/songs/logo.png';
    return this.currentSong()?.song_image !== defaultImagePath;
  }
  

}
