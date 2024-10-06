import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';
import { Album } from '../../../auth/interfaces/album.interface';
import { GetAlbumsService } from '../../artistServices/get-albums.service';
import { User } from '../../../auth/interfaces/user.interface';
import { SearchService } from '../../../features/services/search.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent {
  user: User
  albums = signal<Album[]>([]);
  searchQuery: string = '';
  showThereArentAlbums = true
  private genreFiltredQuery: string = this.searchService.getGenreFiltredLocalStorage()
  private publicationDateQuery: string = this.searchService.getPublicationDateFiltredLocalStorage()

  searchTriggeredSubscription: Subscription | null = null
  genreFiltredTriggeredSubscription: Subscription | null = null;
  publicationDateFiltredTriggeredSubscription: Subscription | null = null;



  constructor(private currentUserService: GetUserService,
    private router: Router,
    private userService: GetUserService,
    private searchService: SearchService,
    private getAlbumsService: GetAlbumsService,) {

    this.user = this.userService.getUser();
    this.searchTriggeredSubscription = this.searchService.searchTriggered$.subscribe((triggered) => {
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

    this.searchService.resetPublicationDateFiltredTriggered()
  }





  getAlbumsByCurrentArtist() {
    const albumsLocal = this.getAlbumsService.getAlbumsByIdArtist(this.user.id);
    this.albums.set(albumsLocal);
  }

  onShowAlbum(album: Album) {
    if (this.user.role === 'artist') {
      this.router.navigate([`/home/artist/${this.user.id}/album/${album.id}`])
    } else {
      this.router.navigate([`/home/${this.user.id}/album/${album.id}`])
    }

  }

  onShowAlbumLikeArtist(album: Album) {
    this.router.navigate([`/home/artist/${this.user.id}/my-songs/my-albums/${album.id}`])
  }


  onAddAlbum() {
    this.searchService.activateCreateAlbum()
    this.router.navigate([`/home/artist/${this.currentUserService.getUser().id}/my-songs/create-album`])
  }

  searchAlbums(input: string) {
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
  }


}
