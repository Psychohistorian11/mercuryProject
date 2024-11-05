import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SearchService } from '../../../features/services/search.service';
import { AlbumAPIService } from '../../../API/album/album-api.service';
import { GetTokenService } from '../../generalServices/get-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list-searching',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './album-list-searching.component.html'
})
export class AlbumListSearchingComponent {

        token: any
        albums = signal<any[]>([])
        input = ''

    constructor(private searchService: SearchService,
          private albumAPIService: AlbumAPIService,
          private getToken: GetTokenService,
          private router: Router,
      ){

          this.token = this.getToken.getToken()
          this.searchService.loadFromStorage();

          this.searchService.getInputSearching().subscribe({
          next: (data) => {
            this.input = data
            this.getAlbumsByWord(data)
          }
          })

          this.searchService.getGenredFiltredSearching().subscribe({
          next: (data) => {
            this.getAlbumsByGenredId(data)
          }
          })
      }

      getAlbumsByWord(input: string){
        this.albumAPIService.getAlbumsByWord(input).subscribe({
          next: (response) => {
            this.albums.set(response)
          }
        })
      }

      getAlbumsByGenredId(genreId: string){
          this.albumAPIService.getAlbumsByGenreId(genreId).subscribe({
            next: (response) => {
              this.albums.set(response)
            }
          })
      }

      onShowAlbum(album: any) {
        if (this.token.role === 'artist') {
          this.router.navigate([`/home/artist/${this.token.sub}/album/${album.id}`])
        } else {
          this.router.navigate([`/home/${this.token.sub}/album/${album.id}`])
        }
      }


}
