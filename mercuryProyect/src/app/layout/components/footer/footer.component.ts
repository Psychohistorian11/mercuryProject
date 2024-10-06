import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Album } from '../../../auth/interfaces/album.interface';
import { GetAlbumsService } from '../../../shared/artistServices/get-albums.service';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  albums = signal<Album[]>([])
  user: User

  constructor(private getAlbumsService: GetAlbumsService,
    private getUserService: GetUserService,
    private router: Router,
  ) {
    this.user = getUserService.getUser()
  }

  ngOnInit() {
    this.loadAlbums()

  }

  loadAlbums() {
    const albums = this.getAlbumsService.getAllAlbums();
    if (albums && albums.length > 0) {
      const lastSixAlbums = albums.slice(-7);
      this.albums.set(lastSixAlbums);
    } else {
      console.warn('No hay álbumes disponibles.');
      this.albums.set([]);
    }
  }


  onShowAlbum(album: Album) {
    if (this.user.role === 'artist') {
      this.router.navigate([`/home/artist/${this.user.id}/album/${album.id}`])
    } else {
      this.router.navigate([`/home/${this.user.id}/album/${album.id}`])
    }
  }

}
