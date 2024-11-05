import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemporaryData } from '../../auth/interfaces/temporaryData.interface';
import { Song } from '../../auth/interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaySongService {

  audio = ''

  private imageSubject = new BehaviorSubject<string | null>(null);
  public image$ = this.imageSubject.asObservable();

  private audioSubject = new BehaviorSubject<string | null>(null);
  public audio$ = this.audioSubject.asObservable()

  private songSubject = new BehaviorSubject<any>(null);
  public song = this.songSubject.asObservable()


  constructor() {

    const tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}');
    if (tempData.currentImageInPlay) {
      this.imageSubject.next(tempData.currentImageInPlay);
    }
    /*if (tempData.currentAudioInPlay) {
      this.audioSubject.next(tempData.currentAudioInPlay)
    }*/
  }

  setSong(song: any) {
    this.songSubject.next(song)
    console.log("LLegue aquí tambien")
  }

  getSong(){
    console.log("lelgue ")
    return this.songSubject.asObservable()
  }

  setAudio(audio: string) {
    this.audioSubject.next(audio);
  }

  setImage(image: string) {
    this.resizeBase64Img(image, 400, 400)
      .then((resizedImage) => {
        let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}');
        tempData.currentImageInPlay = resizedImage;
        localStorage.setItem('temporaryData', JSON.stringify(tempData));
        this.imageSubject.next(resizedImage);
      })
      .catch((err) => {
        console.error('Error al redimensionar la imagen:', err);
      });
  }

  setImageSupabase(image: string) {
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}')
    tempData.currentImageInPlay = image
    this.imageSubject.next(image);
    localStorage.setItem('temporaryData', JSON.stringify(tempData));
  }

  /*getImage(): string {
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}');
    return tempData.currentImageInPlay;
  }

  getAudio(): string | null {
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}');
    return tempData.currentAudioInPlay;
  }*/


  getAudio() {
    let tempData: TemporaryData = JSON.parse(localStorage.getItem('temporaryData') || '{}')
    return tempData.currentAudioInPlay
  }



  resizeBase64Img(base64Str: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Str;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(resizedBase64);
      };

      img.onerror = (err) => reject(err);
    });
  }
}
