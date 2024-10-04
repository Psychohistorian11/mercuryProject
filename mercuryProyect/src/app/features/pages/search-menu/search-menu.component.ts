import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { ArtistListComponent } from "../../../shared/artistComponents/artist-list/artist-list.component";
import { SongListComponent } from '../../../shared/artistComponents/song-list/song-list.component';
import { AlbumListComponent } from "../../../shared/artistComponents/album-list/album-list.component";
import { GetGenresService } from '../../../shared/generalServices/get-genres.service';
import { Genres } from '../../../auth/interfaces/album.interface';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../../shared/generalComponents/loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-menu',
  standalone: true,
  imports: [ArtistListComponent, SongListComponent, AlbumListComponent, NgFor, FormsModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './search-menu.component.html'
})
export class SearchMenuComponent implements OnInit{
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
      publicationDate: [null],
    });

  }
        
  ngOnInit() {
    this.loadGenres()
    this.route.params.subscribe(params => {
      this.searchInput = params['input'];
    });
    this.searchService.setInputLocalStorage(this.searchInput)
  }


  loadGenres(){
    const genres = this.getGenresService.getGenres()
    this.genres.set(genres)
  }


  clearFilters() {
    this.registerForm.reset();  
    this.selectedGenre = '';   
    this.selectedDate = '';    
  }

  async onSubmit(){
      if(this.registerForm.valid){
          this.loadingComponent.showLoading();

          const filterData = {
            genre: this.registerForm.value.genre,
            publicationDate: this.registerForm.value.publicationDate
          }
          try {
            console.log("fecha: ", filterData.publicationDate)

            if (filterData.genre && filterData.publicationDate) {
              Swal.fire('Error', 'Por favor, selecciona solo un filtro: género o fecha de publicación.');
            } else if (filterData.genre) {
              this.searchService.setGenreFiltred(filterData.genre);
            } else if (filterData.publicationDate) {
              this.searchService.setPublicationDataFiltred(filterData.publicationDate);
            } else {
              Swal.fire('Advertencia', 'Debes seleccionar al menos un filtro.');
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
