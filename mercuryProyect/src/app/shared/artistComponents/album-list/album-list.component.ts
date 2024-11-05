import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { Album } from '../../../auth/interfaces/album.interface';
import { GetAlbumsService } from '../../artistServices/get-albums.service';
import { User } from '../../../auth/interfaces/user.interface';
import { SearchService } from '../../../features/services/search.service';
import { Subscription } from 'rxjs';
import { GetTokenService } from '../../generalServices/get-token.service';
import { AlbumAPIService } from '../../../API/album/album-api.service';


@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent {
  token: any
  albums = signal<any[]>([]);
  searchQuery: string = '';
  showThereArentAlbums = true
  private genreFiltredQuery: string = this.searchService.getGenreFiltredLocalStorage()
  private publicationDateQuery: string = this.searchService.getPublicationDateFiltredLocalStorage()

  searchTriggeredSubscription: Subscription | null = null
  genreFiltredTriggeredSubscription: Subscription | null = null;
  publicationDateFiltredTriggeredSubscription: Subscription | null = null;



  constructor(private currentUserService: GetUserService,
    private router: Router,
    //private userService: GetUserService,
    private getToken: GetTokenService,
    private searchService: SearchService,
    private getAlbumsService: GetAlbumsService,
    private albumAPIService: AlbumAPIService) {

    this.token = this.getToken.getToken();
    this.getAlbumsByCurrentArtist()

    /*this.searchTriggeredSubscription = this.searchService.searchTriggered$.subscribe((triggered) => {
      if (triggered) {
        this.searchQuery = this.searchService.getInputLocalStorage();
        this.searchAlbums(this.searchQuery);
        this.showThereArentAlbums = false
      } if (!triggered) {
        this.getAlbumsByCurrentArtist()
      }
    });
    this.searchService.resetSearchTriggered();

    this.genreFiltredTriggeredSubscription = this.searchService.genreFiltredTriggered$.subscribe((triggered) => {
      if (triggered) {
        this.genreFiltredQuery = this.searchService.getGenreFiltredLocalStorage();
        this.searchAlbumsFiltredGenre(this.genreFiltredQuery);
        this.showThereArentAlbums = false
      } if (!triggered) {
        this.getAlbumsByCurrentArtist()
      }
    });

    this.searchService.resetGenreFiltredTriggered()

    this.publicationDateFiltredTriggeredSubscription = this.searchService.publicationDateFiltredTriggered$.subscribe((triggered) => {
      if (triggered) {
        this.publicationDateQuery = this.searchService.getPublicationDateFiltredLocalStorage();
        this.searchAlbumsFiltredPublicationDate(this.publicationDateQuery);
        this.showThereArentAlbums = false
      } if (!triggered) {
        this.getAlbumsByCurrentArtist()
      }
    });

    this.searchService.resetPublicationDateFiltredTriggered()*/
  }





  getAlbumsByCurrentArtist() {

    this.albumAPIService.getAlbumByArtistId(this.token.sub).subscribe({
      next: (response) => {
        console.log(response.data[0])
        this.albums.set(response.data)
          
      },
      error: (error) => {
          console.log(error)
      }
    })
  }



  onShowAlbumLikeArtist(album: any) {
    this.router.navigate([`/home/artist/${this.token.sub}/my-songs/my-albums/${album.album_id}`])
  }


  onAddAlbum() {
    this.searchService.activateCreateAlbum()
    this.router.navigate([`/home/artist/${this.token.sub}/my-songs/create-album`])
  }

  /*searchAlbums(input: string) {
    const albumsByInput = this.getAlbumsService.getAlbumsFilteredByInput(input)
    this.albums.set(albumsByInput)
  }

  searchAlbumsFiltredGenre(idGenre: string) {
    const songsFiltredGenre = this.getAlbumsService.getAlbumsFiltredByGenre(idGenre)
    this.albums.set(songsFiltredGenre)
  }

  searchAlbumsFiltredPublicationDate(date: string) {
    const songsFiltredPublicationDate = this.getAlbumsService.getAlbumsFiltredByPublicationDate(date)
    this.albums.set(songsFiltredPublicationDate)
  }*/


}
