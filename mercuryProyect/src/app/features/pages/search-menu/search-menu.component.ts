import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { GetGenresService } from '../../../shared/generalServices/get-genres.service';
import { Genres } from '../../../auth/interfaces/album.interface';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/generalComponents/loading/loading.component';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { AlbumListSearchingComponent } from "../../../shared/generalComponents/album-list-searching/album-list-searching.component";
import { SongListSearchingComponent } from "../../../shared/generalComponents/song-list-searching/song-list-searching.component";
import { ArtistListSearchingComponent } from "../../../shared/generalComponents/artist-list-searching/artist-list-searching.component";

@Component({
  selector: 'app-search-menu',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, LoadingComponent, 
    AlbumListSearchingComponent, SongListSearchingComponent, ArtistListSearchingComponent],
  templateUrl: './search-menu.component.html'
})
export class SearchMenuComponent implements OnInit {
  searchInput: string;
  genres = signal<Genres[]>([])
  registerForm: FormGroup;
  selectedGenre: string = '';
  selectedDate: string = '';
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;


  constructor(private route: ActivatedRoute,
    private searchService: SearchService,
    private getGenresService: GetGenresService,
    private fb: FormBuilder,) {
    this.searchInput = ''
    this.registerForm = this.fb.group({
      genre: [null],
    });

  }

  ngOnInit() {
    this.loadGenres();

    this.route.params
      .pipe(
        switchMap(params => {
          this.searchInput = params['input'] || '';
          return of(this.searchInput);
        })
      )
      .subscribe(input => {
        this.searchService.setInputSearching(input);
      });
  }


  loadGenres() {
    const genres = this.getGenresService.getGenres()
    this.genres.set(genres)
  }


  clearFilters() {
    this.registerForm.reset();
    this.selectedGenre = '';
    this.selectedDate = '';
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.loadingComponent.showLoading();

      const filterData = {
        genre: this.registerForm.value.genre,
      }
      try {

          if(filterData.genre){
            this.searchService.setGenreFiltredSearching(filterData.genre);
          }else {
            Swal.fire('Advertencia', 'Debes seleccionar un filtro.');
          }

        this.registerForm.reset();
        this.clearFilters();

        this.loadingComponent.hideLoading();
      } catch (error) {
        this.loadingComponent.hideLoading();
        Swal.fire('Error', ` Hubo un problema con la busqueda ${error}`);
      }
    }
  }





}
