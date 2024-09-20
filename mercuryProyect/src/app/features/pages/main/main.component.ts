import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { ThreeMainSongsComponent } from '../../../shared/generalComponents/three-main-songs/three-main-songs.component';
import { SlideTImeComponent } from '../../../shared/generalComponents/slide-time/slide-time.component';
import { SongInfoIconArtistComponent } from '../../../shared/generalComponents/song-info-icon-artist/song-info-icon-artist.component';
import { PlayPauseComponent } from '../../../shared/generalComponents/play-pause/play-pause.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, ThreeMainSongsComponent, SlideTImeComponent, SongInfoIconArtistComponent, PlayPauseComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {

}
