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
<<<<<<< HEAD
    
    
=======
  onExitClick(){
    localStorage.removeItem('user');
    window.location.reload();
  }
    // Definimos un evento que puede ser escuchado desde fuera del componente
    @Output() profileClick = new EventEmitter<void>();
    onProfileClick(){
      this.profileClick.emit();
    }

>>>>>>> origin/login-signUp-Angular
  }

