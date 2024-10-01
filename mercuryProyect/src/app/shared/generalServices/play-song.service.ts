import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaySongService {


  constructor() { }


  setFile(audio: string) {
    localStorage.setItem('currentAudio', audio);

  }

  setImage(image: string){
    localStorage.setItem('currentImage', image);

  }


  getImage(): string | null {
    return localStorage.getItem('currentImage');
  }

  getFile(): string | null {
    return localStorage.getItem('currentFile');
  }
}
