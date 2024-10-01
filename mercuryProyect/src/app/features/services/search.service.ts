import { Injectable } from '@angular/core';
import { GetSongsService } from '../../shared/artistServices/get-songs.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private getSongs: GetSongsService) {}

  private createAlbum = new BehaviorSubject<boolean>(false);
  alarm$ = this.createAlbum.asObservable();

  activateCreateAlbum() {
    this.createAlbum.next(true);
  }

  deactivateAlarm() {
    this.createAlbum.next(false);
  }



}
