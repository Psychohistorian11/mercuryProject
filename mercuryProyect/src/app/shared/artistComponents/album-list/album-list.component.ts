import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { Album } from '../../../auth/interfaces/album.interface';
import { GetAlbumsService } from '../../artistServices/get-albums.service';
import { User } from '../../../auth/interfaces/user.interface';
import { SearchService } from '../../../features/services/search.service';


@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent {
  albums = signal<Album[]>([]);
  private searchQuery: string = '';
  private artist: User;



  constructor(private currentUser: GetUserService, 
              private router: Router,
              private user: GetUserService,
              private search: SearchService,
              private getAlbumsService: GetAlbumsService){
              
              this.artist = this.user.getUser();
              this.checkSearchQuery();
  }

  

  checkSearchQuery() {
    if (this.searchQuery.trim() === '') {
      this.onAlbumSelect();
    } else {
      this.searchAlbums(this.searchQuery);
    }
  }

  onAlbumSelect(){
    const albumsLocal = this.getAlbumsService.getAlbumsByArtist(this.artist.id);
    this.albums.set(albumsLocal);
    console.log(this.albums())
  }

  searchAlbums(query: string){
    
  }

  onShowAlbum(album: Album){
      this.router.navigate([`/home/artist/${this.artist.id}/my-songs/my-albums/${album.id}`])
  }


  onAddAlbum(){
    this.search.activateCreateAlbum()
    this.router.navigate([`/home/artist/${this.currentUser.getUser().id}/my-songs/create-album`])
  }

  
}
