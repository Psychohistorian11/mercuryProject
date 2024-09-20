import { Component, signal } from '@angular/core';
import { AsideComponent } from '../../../layout/components/aside/aside.component';
import { NgIf, NgFor } from '@angular/common';
import { Song } from '../../../auth/interfaces/Recommendations.interface';
import { SongListComponent } from '../../../shared/artistComponents/song-list/song-list.component';
import { FormNewMusicComponent } from "../../../shared/artistComponents/form-new-music/form-new-music.component";
@Component({
  selector: 'app-songs-artist',
  standalone: true,
  imports: [AsideComponent, NgIf, NgFor, SongListComponent, FormNewMusicComponent],
  templateUrl: './songs-artist.component.html'
})
export class SongsArtistComponent {
  currentView: 'music' | 'album' | 'create' = 'music';
  selectedSong: Song = {name: '', nameArtist: '', type: '', image : '', time: ''};


  onChangeOpen(view: 'music' | 'album' | 'create') {
    this.currentView = view;
  }

  songs = signal<Song[]>([
    { name: 'Dark Side of The Moon', nameArtist: 'Pink Floyd', type: 'Album', image: '../../../../assets/songs/Dark_Side_of_the_Moon.png', time: '2:40'},
    { name: 'The Rise and Fall of Ziggy...', nameArtist: 'David Bowie', type: 'Album', image: '../../../../assets/songs/theRiseAndFallOfZiggyStardustAndTheSpidersFromMars.png', time: '3:30'},
    { name: 'Led Zeppelin IV', nameArtist: 'Led Zeppelin', type: 'Album', image: '../../../../assets/songs/led_Zeppelin.png', time: '3:30'},
    { name: 'Paranoid', nameArtist: 'Black Sabbath', type: 'Album', image: '../../../../assets/songs/paraonid.png', time: '2:10'},
    { name: 'A night at the Opera', nameArtist: 'Queen', type: 'Album', image: '../../../../assets/songs/Queen_A_Night_At_The_Opera.png', time: '3:40'},
    { name: 'Toxicity', nameArtist: 'System of Down', type: 'Album', image: '../../../../assets/songs/SystemofaDownToxicityalbumcover.png', time: '4:10'},
  ]);

  onSongSelect(song: Song) {
    this.selectedSong = song; 
  }
}
