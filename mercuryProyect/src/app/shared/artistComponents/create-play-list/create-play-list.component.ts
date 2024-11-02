import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Song } from '../../../auth/interfaces/song.interface';

@Component({
  selector: 'app-create-play-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './create-play-list.component.html',
  styleUrl: './create-play-list.component.css'
})
export class CreatePlayListComponent {

  suggestedSongs: Song[] = [
    { id: '1', name: 'Song 1', time: '3:45', image: 'path/to/image1.jpg', audio: "2", by: "Mora",datePublished:""},
    { id: '2', name: 'Song 2', time: '4:20', image: 'path/to/image2.jpg',audio: "2", by: "Mora",datePublished:"" },

  ];
  addedSongs: Song[] = [];

  addSong(song: Song): void {
    if (!this.addedSongs.some(s => s.id === song.id)) {
      this.addedSongs.push(song);

      this.suggestedSongs = this.suggestedSongs.filter(s => s.id !== song.id);
    }
  }

    removeSong(song: Song): void {
      this.addedSongs = this.addedSongs.filter(s => s.id !== song.id);
  
      if (!this.suggestedSongs.some(s => s.id === song.id)) {
        this.suggestedSongs.push(song);
      }
    }

}


