import { Component, ElementRef, ViewChild } from '@angular/core';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  private currentUser: User;

  constructor(private router: Router, private user: GetUserService) {
    this.currentUser = user.getUser();
  }

  search(input: string) {
    if (!input) {
      Swal.fire('Error', 'Por favor, Ingrese valores en el buscador.');
    } else if (this.currentUser.role === 'artist') {
      this.router.navigate([`/home/artist/${this.currentUser.id}/search/${input}`]);
    } else if (this.currentUser.role === 'hearer') {
      this.router.navigate([`/home/${this.currentUser.id}/search/${input}`]);
    }
  }

}
