import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../../auth/interfaces/Recommendations.interface';
import { NgClass } from '@angular/common' ;

@Component({
  selector: 'app-song-item',
  standalone: true,
  imports: [ NgClass],
  template: `
    <div class="m-2 border-b-4 flex hover:bg-gray-700 transition-colors duration-300"
      [ngClass]="{'bg-gray-700': isSelected}"
      (dblclick)="handleDblClick()">
      <div class="h-[10%] w-[10%] p-2">
        <img [src]="song.image">
      </div>
      <a class="ml-10 flex flex-col justify-center text-xl">
        {{song.name}}<br>
        <span class="text-[14px] text-[#bbb] mt-1">{{song.nameArtist}}</span>
      </a>
      <div class="flex flex-col justify-center ml-auto mr-8 text-xl">
        {{song.time}}
      </div>
    </div>
  `
})
export class SongItemComponent {
  @Input() song!: Song;
  @Input() isSelected = false;
  @Output() songSelected = new EventEmitter<Song>();

  handleDblClick() {
    this.songSelected.emit(this.song);
  }
}
