import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { ThreeMainSongsComponent } from '../../../shared/generalComponents/three-main-songs/three-main-songs.component';
import { SongInfoIconArtistComponent } from '../../../shared/generalComponents/song-info-icon-artist/song-info-icon-artist.component';
import { PlaySongComponent } from "../../../shared/generalComponents/play-song/play-song.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, ThreeMainSongsComponent, SongInfoIconArtistComponent, PlaySongComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
      
}
