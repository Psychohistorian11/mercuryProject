import { Component, OnInit, signal } from '@angular/core';
import { Song } from '../../../auth/interfaces/song.interface';
import { PlaySongService } from '../../generalServices/play-song.service';

@Component({
  selector: 'app-song-info-icon-artist',
  standalone: true,
  imports: [],
  templateUrl: './song-info-icon-artist.component.html'
})
export class SongInfoIconArtistComponent{
  
        currentSong = signal<Song | null>(null)


        constructor(private playSongervice: PlaySongService){

          this.playSongervice.song.subscribe((song) => {
            if(song){
              this.currentSong.set(song)
            }
          })
        }

}
