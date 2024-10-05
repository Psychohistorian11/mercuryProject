  import { Injectable } from '@angular/core';
  import { GetSongsService } from '../../shared/artistServices/get-songs.service';
  import { BehaviorSubject } from 'rxjs';
  import { TemporaryData } from '../../auth/interfaces/temporaryData.interface';
  import { Genres } from '../../auth/interfaces/album.interface';
import { enviroment } from '../../enviroments/enviroment';


  @Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    private readonly TEMPORARYDATA_STORAGE_KEY = enviroment.localStorageConfig.temporaryDate.key

    private createAlbum = new BehaviorSubject<boolean>(false);
    alarm$ = this.createAlbum.asObservable();

    private inputOfSearch = new BehaviorSubject<string>('')
    input$ = this.inputOfSearch.asObservable()

    private searchTriggered = new BehaviorSubject<boolean>(false); 
    searchTriggered$ = this.searchTriggered.asObservable();

    private genreFiltred = new BehaviorSubject<string>('')
    genredFiltred$ = this.genreFiltred.asObservable()

    private genreFiltredTriggered = new BehaviorSubject<boolean>(false); 
    genreFiltredTriggered$ = this.genreFiltredTriggered.asObservable();

    private publicationDateFiltred = new BehaviorSubject<string>('')
    publicationDate$ = this.publicationDateFiltred.asObservable()

    private publicationDateFiltredTriggered = new BehaviorSubject<boolean>(false)
    publicationDateFiltredTriggered$ = this.publicationDateFiltredTriggered.asObservable()


    constructor(private getSongs: GetSongsService) {
      const tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}');
      if (tempData.isCreateAlbum) {
        this.createAlbum.next(tempData.isCreateAlbum);
      }
    }

    activateCreateAlbum() {
      this.createAlbum.next(true);
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      tempData.isCreateAlbum = true
      localStorage.setItem('temporaryData', JSON.stringify(tempData));
    }

    deactivateAlarm() {
      this.createAlbum.next(false);
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      tempData.isCreateAlbum = false
      localStorage.setItem('temporaryData', JSON.stringify(tempData));
    }


    setInputLocalStorage(input: string){
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      tempData.currentInput = input
      localStorage.setItem('temporaryData', JSON.stringify(tempData));
      this.inputOfSearch.next(input);
      this.searchTriggered.next(true); 
    }

    setGenreFiltred(idGenre: string){
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      tempData.currentGenreFiltred = idGenre
      localStorage.setItem('temporaryData', JSON.stringify(tempData));
      this.genreFiltred.next(idGenre);
      this.genreFiltredTriggered.next(true);
    }

    setPublicationDataFiltred(publicationDate: string){
       let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
       tempData.currentPublicationDateFiltred = publicationDate
       localStorage.setItem('temporaryData', JSON.stringify(tempData))
       this.publicationDateFiltred.next(publicationDate)
       this.publicationDateFiltredTriggered.next(true)
    }



    resetSearchTriggered() {
      this.searchTriggered.next(false);
    }

    resetGenreFiltredTriggered() {
      this.genreFiltredTriggered.next(false);
    }

    resetPublicationDateFiltredTriggered(){
      this.publicationDateFiltredTriggered.next(false)
    }


    getInputLocalStorage(): string{
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      return tempData.currentInput
    }

    getGenreFiltredLocalStorage(): string{
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      return tempData.currentGenreFiltred
    }

    getPublicationDateFiltredLocalStorage(): string{
      let tempData: TemporaryData = JSON.parse(localStorage.getItem(this.TEMPORARYDATA_STORAGE_KEY) || '{}')
      return tempData.currentPublicationDateFiltred
    }



  }
