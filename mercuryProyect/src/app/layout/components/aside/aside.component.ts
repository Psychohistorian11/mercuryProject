import { Component } from '@angular/core';
import { SearchComponent } from "../../../shared/components/search/search.component";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

}
