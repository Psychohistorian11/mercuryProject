import { Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../features/services/search.service';
import { GetArtistsService } from '../../artistServices/get-artists.service';
import { Artist, User } from '../../../auth/interfaces/user.interface';
import { NgFor } from '@angular/common';
import { GetUserService } from '../../generalServices/get-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './artist-list.component.html'
})
export class ArtistListComponent {
  user: User
  private searchQuery: string = '';
  searchTriggeredSubscription: Subscription | null = null

  artists = signal<Artist[]>([])


  constructor(private searchService: SearchService,
    private getArtistsService: GetArtistsService,
    private userService: GetUserService,
    private router: Router,

  ) {
    this.user = userService.getUser()
    this.searchTriggeredSubscription = this.searchService.searchTriggered$.subscribe((triggered) => {
      if (triggered) {
        this.searchQuery = this.searchService.getInputLocalStorage();
        this.searchArtists(this.searchQuery);


      } if (!triggered) {
        this.searchArtists(this.searchQuery)
      }
    });
    this.searchService.resetSearchTriggered();
  }

  onShowArtist(artist: Artist) {
    if (this.user.role === 'artist') {
      this.router.navigate([`/home/artist/${this.user.id}/artist/${artist.id}`])
    } else {
      this.router.navigate([`/home/${this.user.id}/artist/${artist.id}`])
    }
  }

  searchArtists(input: string) {
    const artistsLocal = this.getArtistsService.getArtistsFilteredByInput(input)
    this.artists.set(artistsLocal)
  }

}
