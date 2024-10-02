import { Injectable } from '@angular/core';
import { Album } from '../../auth/interfaces/album.interface';
import { enviroment } from '../../enviroments/enviroment';
import { Song } from '../../auth/interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumsService {

  private readonly ALBUM_STORAGE_KEY = enviroment.localStorageConfig.albums.key;
  private readonly ALBUM_ARTIST_STORAGE_KEY = enviroment.localStorageConfig.albumsArtist.key;
  private readonly SONG_STORAGE_KEY = enviroment.localStorageConfig.songs.key

  constructor() { }

  private getSongsFromLocalStorage(): Song[] {
    const songsString = localStorage.getItem(this.SONG_STORAGE_KEY);
    return songsString ? JSON.parse(songsString) : [];
  }

  getAlbumsByArtist(idArtist: string): Album[]{
    const albumsOfArtistData = localStorage.getItem(this.ALBUM_ARTIST_STORAGE_KEY);
    const albumsData = localStorage.getItem(this.ALBUM_STORAGE_KEY);

    if (albumsOfArtistData && albumsData) {
      const allsongsOfArtist = JSON.parse(albumsOfArtistData); 
      const allSongs = JSON.parse(albumsData); 
  
      const artistEntries = allsongsOfArtist.filter((entry: any) => entry.idArtist === idArtist);
  
      if (artistEntries.length > 0) {
        const albumIds = artistEntries.map((entry: any) => entry.idAlbum);

        const albums: Album[] = allSongs
          .filter((album: any) => albumIds.includes(album.id)) 
          .map((album: any) => ({
            id: album.id,
            image: album.image, 
            by: album.by,  
            name: album.name,
            datePublished: album.datePublished,
            idGenre: album.idGenre
          }));
  
        return albums;
      }
    }
    return [];
  }


  getAlbumById(id: string): Album | null {
    const albumsString = localStorage.getItem(this.ALBUM_STORAGE_KEY);
    
    if (!albumsString) {
      return null;
    }
    const albums: Album[] = JSON.parse(albumsString);
    const album = albums.find(album => album.id === id);
    return album ? album : null;
  }
  

  getSongByAlbumId(idAlbum: string): Song[] {
    const storedSongs: Song[] = this.getSongsFromLocalStorage();
    const songsWithAlbum = storedSongs.filter(song => song.idAlbum === idAlbum);
    return songsWithAlbum;
  } 
}
