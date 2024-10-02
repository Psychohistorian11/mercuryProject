import { Injectable } from '@angular/core';
import { GetSongsService } from '../../shared/artistServices/get-songs.service';
import { BehaviorSubject } from 'rxjs';
import { TemporaryData } from '../../auth/interfaces/temporaryData.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private createAlbum = new BehaviorSubject<boolean>(false);
  alarm$ = this.createAlbum.asObservable();

  constructor(private getSongs: GetSongsService) {
    const tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}');
    if (tempData.isCreateAlbum) {
      this.createAlbum.next(tempData.isCreateAlbum);
    }
  }

  activateCreateAlbum() {
    this.createAlbum.next(true);
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}')
    tempData.isCreateAlbum = true
    localStorage.setItem('temporaryData', JSON.stringify(tempData));
  }

  deactivateAlarm() {
    this.createAlbum.next(false);
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}')
    tempData.isCreateAlbum = false
    localStorage.setItem('temporaryData', JSON.stringify(tempData));
  }



}
