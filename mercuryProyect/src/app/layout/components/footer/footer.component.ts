import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Recommendations } from '../../../auth/interfaces/Recommendations.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Output() albumClick = new EventEmitter<void>();

      listOfRecomentadions =  signal<Recommendations[]>([
          { name: 'Dark Side of The Moon', nameArtist: 'Pink Floyd', type: 'Album', image: '../../../../assets/songs/Dark_Side_of_the_Moon.png'},
          { name: 'The Rise and Fall of Ziggy...', nameArtist: 'David Bowie', type: 'Album', image: '../../../../assets/songs/theRiseAndFallOfZiggyStardustAndTheSpidersFromMars.png'},
          { name: 'Led Zeppelin IV', nameArtist: 'Led Zeppelin', type: 'Album', image: '../../../../assets/songs/led_Zeppelin.png'},
          { name: 'Paranoid', nameArtist: 'Black Sabbath', type: 'Album', image: '../../../../assets/songs/paraonid.png'},
          { name: 'A night at the Opera', nameArtist: 'Queen', type: 'Album', image: '../../../../assets/songs/Queen_A_Night_At_The_Opera.png'},
          { name: 'Toxicity', nameArtist: 'System of Down', type: 'Album', image: '../../../../assets/songs/SystemofaDownToxicityalbumcover.png'},
      ])

      onAlbumClick(){
        this.albumClick.emit(); 
      }
}
