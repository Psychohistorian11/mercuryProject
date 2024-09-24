import { Component } from '@angular/core';
import { SearchComponent } from '../../../shared/generalComponents/search/search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    
    
  }

