import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { Album } from '../../../auth/interfaces/album.interface';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent {

  constructor(private currentUser: GetUserService, private router: Router){

  }

  albums = signal<Album[]>([]);


  onAddAlbum(){
    this.router.navigate([`/home/artist/${this.currentUser.getUser().id}/my-songs/create-album`])
  }

  
}
