import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { SearchArtistsComponent } from "../../../shared/artistComponents/search-artists/search-artists.component";
import { SongListComponent } from '../../../shared/artistComponents/song-list/song-list.component';
import { AlbumListComponent } from "../../../shared/artistComponents/album-list/album-list.component";

@Component({
  selector: 'app-search-menu',
  standalone: true,
  imports: [SearchArtistsComponent, SongListComponent, AlbumListComponent],
  templateUrl: './search-menu.component.html'
})
export class SearchMenuComponent implements OnInit{
  searchInput: string;

  constructor(private route: ActivatedRoute, private serach: SearchService) {
    this.searchInput = ''
  }
        
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchInput = params['input'];
    });
    console.log(this.searchInput)
  }

  


  
}
