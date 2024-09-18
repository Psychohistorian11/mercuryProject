import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    // Definimos un evento que puede ser escuchado desde fuera del componente
    @Output() profileClick = new EventEmitter<void>();
    onProfileClick(){
      this.profileClick.emit(); 
    }
    
  }

