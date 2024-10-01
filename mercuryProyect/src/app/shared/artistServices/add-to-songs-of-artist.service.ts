import { Injectable } from '@angular/core';
import { songsOfArtist } from '../../auth/interfaces/songsArtist.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddToSongsOfArtistService {

  constructor() { }
  private readonly SONG_ARTIST_STORAGE_KEY = enviroment.localStorageConfig.songsArtist.key

  

    getSongsOfArtist(): songsOfArtist[]{
      const storedSongsArtist = localStorage.getItem(this.SONG_ARTIST_STORAGE_KEY);
    return storedSongsArtist ? JSON.parse(storedSongsArtist) : [];
    }



    addSongArtistLocalStorage(idArtist: string, idSong: string){
      const currentSongsArtist = this.getSongsOfArtist()

      const songOfArtist: songsOfArtist = {
          idArtist: idArtist,
          idSong: idSong
      }

      currentSongsArtist.push(songOfArtist)
      localStorage.setItem(this.SONG_ARTIST_STORAGE_KEY, JSON.stringify(currentSongsArtist))
  }
}
