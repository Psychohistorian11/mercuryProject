import { Component, signal } from '@angular/core';
import {  threeSongs } from '../../../auth/interfaces/Recommendations.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-three-main-songs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './three-main-songs.component.html',
  styleUrl: './three-main-songs.component.css'
})
export class ThreeMainSongsComponent {
      leftSong = signal<threeSongs>({ name: 'Smells like teen spirit', nameArtist: 'Nirvana', type: 'Artista', image: '../../../../assets/songs/nevermind.png'})
      currentSong = signal<threeSongs>({ name: 'Dream', nameArtist: 'David Bowie', type: 'Artista', image: '../../../../assets/songs/dream.png'})
      rightSong = signal<threeSongs>({ name: 'Starman', nameArtist: 'David Bowie', type: 'Artista', image: '../../../../assets/songs/davidBowie.png'})
}
