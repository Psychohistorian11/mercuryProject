import { Component, ElementRef, ViewChild } from '@angular/core';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { GetTokenService } from '../../generalServices/get-token.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  token: any;

  constructor(private router: Router, private getToken: GetTokenService) {
    this.token = this.getToken.getToken()
  }

  search(input: string) {
    if (!input) {
      Swal.fire('Error', 'Por favor, Ingrese valores en el buscador.');
    } else if (this.token.role === 'artist') {
      this.router.navigate([`/home/artist/${this.token.sub}/search/${input}`]);
    } else if (this.token.role === 'user') {
      this.router.navigate([`/home/${this.token.sub}/search/${input}`]);
    }
  }

}
