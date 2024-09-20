import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../../auth/interfaces/Recommendations.interface';
import { SongItemComponent } from '../song-item/song-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ SongItemComponent, NgFor],
  template: `
    <div *ngFor="let song of songs">
      <app-song-item
        [song]="song"
        [isSelected]="selectedSong === song"
        (songSelected)="onSongSelect(song)">
      </app-song-item>
    </div>
  `
})
export class SongListComponent {
  @Input() songs: Song[] = [];
  @Input() selectedSong!: Song
  @Output() songSelect = new EventEmitter<Song>();

  onSongSelect(song: Song) {
    this.songSelect.emit(song);
  }
}
