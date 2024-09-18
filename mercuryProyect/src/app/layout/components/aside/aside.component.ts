import { Component } from '@angular/core';
import { SearchComponent } from "../../../shared/components/search/search.component";
import { PlayListComponent } from "../../../shared/components/play-list/play-list.component";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SearchComponent, PlayListComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
 
}
