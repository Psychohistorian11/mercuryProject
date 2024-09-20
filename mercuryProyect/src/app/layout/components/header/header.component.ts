import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../shared/generalComponents/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    // Definimos un evento que puede ser escuchado desde fuera del componente
    @Output() profileClick = new EventEmitter<void>();
    @Output() artistSongsClick = new EventEmitter<void>();
    onProfileClick(){
      this.profileClick.emit(); 
    }
    onArtistSongsClick(){
      this.artistSongsClick.emit()
    }
    
  }

