import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Album } from '../../../auth/interfaces/album.interface';
import { GetAlbumsService } from '../../../shared/artistServices/get-albums.service';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';
import { AlbumAPIService } from '../../../API/album/album-api.service';
import { GetTokenService } from '../../../shared/generalServices/get-token.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  token: any
  albums = signal<Album[]>([])

  constructor(private getAlbumsService: GetAlbumsService,
    private getToken : GetTokenService,
    private router: Router,
    private albumAPIService: AlbumAPIService
  ) {
    this.token = this.getToken.getToken()
  }

  ngOnInit() {
    this.loadAlbums()

    window.addEventListener('resize', this.checkScreenSize.bind(this));
    this.checkScreenSize();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  loadAlbums(numAlbums: number = 7) {
    const albums = this.getAlbumsService.getAllAlbums();

    if (albums && albums.length > 0) {
      const lastAlbums = albums.slice(-numAlbums);
      this.albums.set(lastAlbums);
    } else {
      console.warn('No hay álbumes disponibles.');
      this.albums.set([]);
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width < 640) {
      this.loadAlbums(4); 
    } else {
      this.loadAlbums(7);
    }
  }

  onShowAlbum(album: Album) {
    if (this.token.role === 'artist') {
      this.router.navigate([`/home/artist/${this.token.sub}/album/${album.id}`])
    } else {
      this.router.navigate([`/home/${this.token.sub}/album/${album.id}`])
    }
  }

}
