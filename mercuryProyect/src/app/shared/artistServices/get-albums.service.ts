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

  getAllAlbums(): Album[] | null {
    const albums = localStorage.getItem(this.ALBUM_STORAGE_KEY)
    if (albums) {
      const allAlbums = JSON.parse(albums)
      return allAlbums || null
    }
    return null
  }

  getAlbumsByIdArtist(idArtist: string): Album[] {
    const albumsOfArtistData = localStorage.getItem(this.ALBUM_ARTIST_STORAGE_KEY);
    const albumsData = localStorage.getItem(this.ALBUM_STORAGE_KEY);

    if (albumsOfArtistData && albumsData) {
      const allsongsOfArtist = JSON.parse(albumsOfArtistData);
      const allAlbums = JSON.parse(albumsData);

      const artistEntries = allsongsOfArtist.filter((entry: any) => entry.idArtist === idArtist);

      if (artistEntries.length > 0) {
        const albumIds = artistEntries.map((entry: any) => entry.idAlbum);

        const albums: Album[] = allAlbums
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

  getAlbumsByIds(ids: string[]): Album[] | null {
    const albumsString = localStorage.getItem(this.ALBUM_STORAGE_KEY);

    if (!albumsString) {
      return null;
    }

    const albums: Album[] = JSON.parse(albumsString);
    const matchingAlbums = albums.filter(album => ids.includes(album.id));
    return matchingAlbums.length > 0 ? matchingAlbums : null;
  }



  getSongByAlbumId(idAlbum: string): Song[] {
    const storedSongs: Song[] = this.getSongsFromLocalStorage();

    const songsWithAlbum = storedSongs.filter(song =>
      song.idAlbum && song.idAlbum.includes(idAlbum)
    );

    return songsWithAlbum;
  }

  getAlbumsFilteredByInput(input: string): Album[] {
    const albumsData = localStorage.getItem(this.ALBUM_STORAGE_KEY);

    if (albumsData) {
      const allAlbums: Album[] = JSON.parse(albumsData);
      const inputLowerCase = input.toLowerCase();

      const getRelevance = (album: Album) => {
        const albumNameLowerCase = album.name.toLowerCase();

        if (albumNameLowerCase === inputLowerCase) {
          return 3;
        } else if (albumNameLowerCase.startsWith(inputLowerCase)) {
          return 2;
        } else if (albumNameLowerCase.includes(inputLowerCase)) {
          return 1;
        } else {
          return 0;
        }
      };

      return allAlbums
        .filter(album => getRelevance(album) > 0)
        .sort((a, b) => getRelevance(b) - getRelevance(a));
    }

    return [];
  }

  getAlbumsFiltredByGenre(idGenre: string) {
    const albums: Album[] = JSON.parse(localStorage.getItem(this.ALBUM_STORAGE_KEY) || '[]');
    return albums.filter(album => album.idGenre === idGenre);
  }

  getAlbumsFiltredByPublicationDate(date: string) {
    const albums: Album[] = JSON.parse(localStorage.getItem(this.ALBUM_STORAGE_KEY) || '[]');
    return albums.filter(album => album.datePublished == date)
  }

}
