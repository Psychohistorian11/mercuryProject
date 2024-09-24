import { Component, Output, EventEmitter, signal } from '@angular/core';
import { Song } from '../../../auth/interfaces/Recommendations.interface';
import { SongItemComponent } from '../song-item/song-item.component';
import { NgFor } from '@angular/common';
import { GetSongsService } from '../../artistServices/get-songs.service';
import { SongFirstContent } from '../../../auth/interfaces/CreateSong.interface';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ SongItemComponent, NgFor],
  template: `
    <div *ngFor="let song of songs()">
      <app-song-item
        [song]="song"
        [isSelected]="selectedSong === song"
        (songSelected)="onSongSelect(song)">
      </app-song-item>
    </div>
  `
})
export class SongListComponent {
  @Output() songSelect = new EventEmitter<Song>();
  private idArtist = '24354rfgbhu65edfggj6768';

  constructor(private getSongsService: GetSongsService){}
  
  songs = signal<Song[]>([
    { name: 'Dark Side of The Moon', nameArtist: 'Pink Floyd', type: 'Album', image: '../../../../assets/songs/Dark_Side_of_the_Moon.png', time: '2:40'},
    { name: 'The Rise and Fall of Ziggy...', nameArtist: 'David Bowie', type: 'Album', image: '../../../../assets/songs/theRiseAndFallOfZiggyStardustAndTheSpidersFromMars.png', time: '3:30'},
    { name: 'Led Zeppelin IV', nameArtist: 'Led Zeppelin', type: 'Album', image: '../../../../assets/songs/led_Zeppelin.png', time: '3:30'},
    { name: 'Paranoid', nameArtist: 'Black Sabbath', type: 'Album', image: '../../../../assets/songs/paraonid.png', time: '2:10'},
    { name: 'A night at the Opera', nameArtist: 'Queen', type: 'Album', image: '../../../../assets/songs/Queen_A_Night_At_The_Opera.png', time: '3:40'},
    { name: 'Toxicity', nameArtist: 'System of Down', type: 'Album', image: '../../../../assets/songs/SystemofaDownToxicityalbumcover.png', time: '4:10'},
  ]);

  
  selectedSong: Song = {name: '', nameArtist: '', type: '', image : '', time: ''};
  

  onSongSelect(song: Song) {
    
    const songsLocal = this.getSongsService.getSongsByArtist(this.idArtist)
    const imageAndFile = this.getSongsService.getImageFileSupabase(songsLocal)
    console.log("canciones: ", songsLocal)
    console.log("imagenes y archivos: ", imageAndFile)
    this.selectedSong = song; 
    this.songSelect.emit(song);
  }
}
