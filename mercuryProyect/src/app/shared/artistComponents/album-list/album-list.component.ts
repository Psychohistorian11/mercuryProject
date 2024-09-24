import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Song } from '../../../auth/interfaces/Recommendations.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="grid grid-cols-3 gap-6">
      <div *ngFor="let album of albums()" class="border border-white p-4 m-2 text-center">
        <a (click)="onViewSongsOfAlbum()">
        <img [src]="album.image" alt="{{ album.name }}" class="w-full h-auto mb-4">
        <a class="block text-xl font-semibold">{{ album.name }}</a>
        <span class="text-gray-400">{{ album.nameArtist }}</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .grid-cols-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  `]
})
export class AlbumListComponent {
  albums = signal<Song[]>([
    { name: 'Dark Side of The Moon', nameArtist: 'Pink Floyd', type: 'Album', image: '../../../../assets/songs/Dark_Side_of_the_Moon.png', time: '2:40'},
    { name: 'The Rise and Fall of Ziggy...', nameArtist: 'David Bowie', type: 'Album', image: '../../../../assets/songs/theRiseAndFallOfZiggyStardustAndTheSpidersFromMars.png', time: '3:30'},
    { name: 'Led Zeppelin IV', nameArtist: 'Led Zeppelin', type: 'Album', image: '../../../../assets/songs/led_Zeppelin.png', time: '3:30'},
    { name: 'Paranoid', nameArtist: 'Black Sabbath', type: 'Album', image: '../../../../assets/songs/paraonid.png', time: '2:10'},
    { name: 'A night at the Opera', nameArtist: 'Queen', type: 'Album', image: '../../../../assets/songs/Queen_A_Night_At_The_Opera.png', time: '3:40'},
    { name: 'Toxicity', nameArtist: 'System of Down', type: 'Album', image: '../../../../assets/songs/SystemofaDownToxicityalbumcover.png', time: '4:10'},
  ]);
  @Output() albumForSeeSongsClick = new EventEmitter<void>();

  onViewSongsOfAlbum() {
      this.albumForSeeSongsClick.emit();  
  }
}
