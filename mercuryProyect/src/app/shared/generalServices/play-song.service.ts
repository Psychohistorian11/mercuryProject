import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaySongService {

  private imageSubject = new BehaviorSubject<string | null>(this.getImage());
  private fileSubject = new BehaviorSubject<string | null>(this.getFile());

  constructor() { }

  setFile(file: string) {
    localStorage.setItem('currentFile', file);
    this.fileSubject.next(file); 
  }

  setImage(image: string){
    console.log("imagennnnn: ", image)
    localStorage.setItem('currentImage', image);
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
