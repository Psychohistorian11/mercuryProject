import { Component } from '@angular/core';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import {User} from '../../../auth/interfaces/user.interface'


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  private currentUser: User
  constructor(private router: Router, private user: GetUserService) {
      this.currentUser = user.getUser()
  }
  search(input: string) {
    if(this.currentUser.role === 'artist'){
        this.router.navigate([`/home/artist/${this.currentUser.id}/search/${input}`])
    }else{
      this.router.navigate([`/home/${this.currentUser.id}/search/${input}`])

    }
    
  }
}
