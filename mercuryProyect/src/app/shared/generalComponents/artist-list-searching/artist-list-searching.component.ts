import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SearchService } from '../../../features/services/search.service';
import { GetTokenService } from '../../generalServices/get-token.service';
import { Router } from '@angular/router';
import { ArtistAPIService } from '../../../API/artist/artist-api.service';

@Component({
  selector: 'app-artist-list-searching',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './artist-list-searching.component.html'
})
export class ArtistListSearchingComponent {

  token: any
  artists = signal<any[]>([])
  input = ''

  constructor(private searchService: SearchService,
    private artistAPIService: ArtistAPIService,
    private getToken: GetTokenService,
    private router: Router,){

      this.token = this.getToken.getToken()
      this.searchService.loadFromStorage();

      this.searchService.getInputSearching().subscribe({
        next: (data) => {
          this.input = data
          
          this.getArtistByWord(data)
        }
        })

  }

  getArtistByWord(input: string){
    this.artistAPIService.getArtistsByWord(input).subscribe({
      next: (response) => {
        console.log("artists:", response)
        this.artists.set(response)
      }
    })
  }


  onShowArtist(artist: any) {
    if (this.token.role === 'artist') {
      this.router.navigate([`/home/artist/${this.token.sub}/artist/${artist.id}`])
    } else {
      this.router.navigate([`/home/${this.token.sub}/artist/${artist.id}`])
    }
  }
}
