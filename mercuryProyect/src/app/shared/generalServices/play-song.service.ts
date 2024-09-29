import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaySongService {

  private imageSubject = new BehaviorSubject<string | null>(this.getImage());
  private fileSubject = new BehaviorSubject<string | null>(this.getFile());

  constructor() { }

  setFileAndImage(file: string, image: string) {
    localStorage.setItem('currentFile', file);
    localStorage.setItem('currentImage', image);
    this.fileSubject.next(file); 
    this.imageSubject.next(image);
  }

  getImageObservable() {
    return this.imageSubject.asObservable();
  }

  getFileObservable() {
    return this.fileSubject.asObservable();
  }

  getImage(): string | null {
    return localStorage.getItem('currentImage');
  }

  getFile(): string | null {
    return localStorage.getItem('currentFile');
  }
}
