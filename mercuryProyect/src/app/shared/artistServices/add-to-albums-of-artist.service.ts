import { Injectable } from '@angular/core';
import { albumsOfArtist } from '../../auth/interfaces/idRelated.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddToAlbumsOfArtistService {
  private readonly ALBUM_ARTIST_STORAGE_KEY = enviroment.localStorageConfig.albumsArtist.key

  constructor() { }

  getAlbumsOfArtist(): albumsOfArtist[] {
    const storedAlbumsArtist = localStorage.getItem(this.ALBUM_ARTIST_STORAGE_KEY);
    return storedAlbumsArtist ? JSON.parse(storedAlbumsArtist) : [];
  }

  addAlbumArtistLocalStorage(idArtist: string, idAlbum: string) {
    const currentAlbumsArtist = this.getAlbumsOfArtist()

    const albumOfArtist: albumsOfArtist = {
      idArtist: idArtist,
      idAlbum: idAlbum
    }

    currentAlbumsArtist.push(albumOfArtist)
    localStorage.setItem(this.ALBUM_ARTIST_STORAGE_KEY, JSON.stringify(currentAlbumsArtist))
  }
}
