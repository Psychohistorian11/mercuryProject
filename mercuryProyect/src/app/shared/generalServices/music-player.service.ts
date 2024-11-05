import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  private currentSongSubject = new BehaviorSubject<any>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  private currentTimeSubject = new BehaviorSubject<number>(0);
  currentTime$ = this.currentTimeSubject.asObservable();
  
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();


  setCurrentSong(song: any) {
    this.currentSongSubject.next(song);
    localStorage.setItem('currentSong', JSON.stringify(song));
  }

  getCurrentSong(){
    return this.currentSongSubject.asObservable()
  }

  setCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
    localStorage.setItem('currentTime', time.toString());
  }

  setPlayingState(isPlaying: boolean): void {
    this.isPlayingSubject.next(isPlaying);
  }

  loadFromStorage(): void {
    const storedSong = localStorage.getItem('currentSong');
    const storedTime = localStorage.getItem('currentTime');

    if (storedSong) {
      this.currentSongSubject.next(JSON.parse(storedSong));
    }
    if (storedTime) {
      this.currentTimeSubject.next(Number(storedTime));
    }
  }
}
