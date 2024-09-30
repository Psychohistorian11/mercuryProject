import { Injectable } from '@angular/core';
import { songsArtist } from '../../auth/interfaces/songsArtist.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddSongArtistService {

  constructor() { }
  private readonly SONG_ARTIST_STORAGE_KEY = enviroment.localStorageConfig.songsArtist.key

    getSongsArtist(): songsArtist[]{
      const storedSongsArtist = localStorage.getItem(this.SONG_ARTIST_STORAGE_KEY);
    return storedSongsArtist ? JSON.parse(storedSongsArtist) : [];
    }

    addSongArtistLocalStorage(idArtist: string, idSong: string){
      const currentSongsArtist = this.getSongsArtist()

      const addSongArtist: songsArtist = {
          idArtist: idArtist,
          idSong: idSong
      }

      currentSongsArtist.push(addSongArtist)
      localStorage.setItem(this.SONG_ARTIST_STORAGE_KEY, JSON.stringify(currentSongsArtist))
  }
}
