import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { ThreeMainSongsComponent } from "../../../shared/components/three-main-songs/three-main-songs.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, ThreeMainSongsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
