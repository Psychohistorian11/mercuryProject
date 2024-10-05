import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BurnedFilesService } from '../burnedFiles/burned-files.service';
import { Artist, User } from './auth/interfaces/user.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Mercury';
  constructor(private burnedFilesService: BurnedFilesService) {
    this.loadUsers(this.burnedFilesService.getBurnedUsers())
    this.loadArtists(this.burnedFilesService.getBurnedArtist())
  }


  loadUsers(users: User[]){
      
  }

  loadArtists(artists: Artist[]){

  }


}
