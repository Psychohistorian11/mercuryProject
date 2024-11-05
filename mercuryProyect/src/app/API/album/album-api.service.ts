import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../../auth/interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumAPIService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  createAlbum(album: Album): Observable<any>{
      const data = {
        genre_id: 13,
        name: album.name,
        description: album.name,
        image: album.image
      }

      const url = `${this.apiUrl}/album`
      return this.http.post(url, data)
  }

  updateAlbum(album: {  
    genre_id: number,
    name: string,
    description: string,
    image: string,
    id: number
  }): Observable<any> {
    const url = `${this.apiUrl}/album`;

    return this.http.put(url, album);
  }

  getAlbumByArtistId(artistId: string): Observable<any>{
    const url = `${this.apiUrl}/album/${artistId}`
    return this.http.get(url)
  }

  getAlbumById(idAlbum: string): Observable<any>{
    const url = `${this.apiUrl}/album/getById/${idAlbum}`
    return this.http.get(url)
  }

  getAlbumsByGenreId(genreId: string): Observable<any>{
    const url = `${this.apiUrl}/album/getAlbumsByGenreId/${genreId}`
    return this.http.get(url)
  }

  getAlbumsByWord(word: string): Observable<any>{
    const url = `${this.apiUrl}/album/getAlbumsByWord/${word}`
    return this.http.get(url)
  }

  getAlbumsTop20():Observable<any>{
    const url = `${this.apiUrl}/album/top20`
    return this.http.get(url)
  }

  deleteAlbumById(albumId: string):Observable<any>{
    const url = `${this.apiUrl}/album/${albumId}`
    return this.http.delete(url)
  }
}
