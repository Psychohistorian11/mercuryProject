import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { ThreeMainSongsComponent } from '../../../shared/components/three-main-songs/three-main-songs.component';
import { SlideTImeComponent } from '../../../shared/components/slide-time/slide-time.component';
import { SongInfoIconArtistComponent } from '../../../shared/components/song-info-icon-artist/song-info-icon-artist.component';
import { PlayPauseComponent } from '../../../shared/components/play-pause/play-pause.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, ThreeMainSongsComponent, SlideTImeComponent, SongInfoIconArtistComponent, PlayPauseComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {

}
