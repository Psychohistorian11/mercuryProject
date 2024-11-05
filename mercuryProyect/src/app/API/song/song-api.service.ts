import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../auth/interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class SongAPIService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  createSong(song: Song): Observable<any>{
    const data = {
      genre_id: "13",
      name: song.name,
      lyrics: "letra",
      time: song.time,
      image: song.image,
      mp3: song.audio
    }

    const url = `${this.apiUrl}/song`
    return this.http.post(url, data)
  }

  updateSong(song: {
    genre_id: 0,
    name: string,
    lyrics: string,
    seconds: 0,
    image: string,
    mp3: string,
    id: 0
  }): Observable<any> {
    const url = `${this.apiUrl}/song`;

    return this.http.put(url, song);
  }


  //POST

  addSongToPlaylist(songId: string, playlistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/addSongToPlaylist/${songId}/${playlistId}`;
    return this.http.post(url, {}); 
  }

  addSongToAlbum(songId: string, albumId: string): Observable<any> {
    const url = `${this.apiUrl}/song/addSongToAlbum/${songId}/${albumId}`;
    return this.http.post(url, {}); 
  }

  addSongToArtist(songId: string, artistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/addSongToArtist/${songId}/${artistId}`;
    return this.http.post(url, {}); 
  }

  replaySong(songId: string):Observable<any>{
    const url = `${this.apiUrl}/song/replaySong/${songId}`
    return this.http.post(url, {})
  }

  //DELETE

  deleteSongFromPlaylist(songId: string, playlistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/deleteSongFromPlaylist/${songId}/${playlistId}`;
    return this.http.delete(url);
  }
  
  deleteSongFromArtist(songId: string, artistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/deleteSongFromArtist/${songId}/${artistId}`;
    return this.http.delete(url);
  }
  
  deleteSongFromAlbum(songId: string, albumId: string): Observable<any> {
    const url = `${this.apiUrl}/song/deleteSongFromAlbum/${songId}/${albumId}`;
    return this.http.delete(url);
  }

  deleteSong(songId: string): Observable<any> {
    const url = `${this.apiUrl}/song/${songId}`;
    return this.http.delete(url);
  }


  //GET

  getSongsFromPlaylist(playlistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/playlist/${playlistId}`;
    return this.http.get(url);
  }

  getSongsFromArtist(artistId: string): Observable<any> {
    const url = `${this.apiUrl}/song/Artist/${artistId}`;
    return this.http.get(url);
  }

  getSongsFromAlbum(albumId: string): Observable<any> {
    const url = `${this.apiUrl}/song/album/${albumId}`;
    return this.http.get(url);
  }

  getSongsByGenreId(genreId: string):Observable<any>{
    const url = `${this.apiUrl}/song/getSongsByGenreId/${genreId}`
    return this.http.get(url)
  }

  getSongsByWord(word: string):Observable<any>{
    const url = `${this.apiUrl}/song/getSongsByWord/${word}`
    return this.http.get(url)
  }

  getRandomSongs(n: string):Observable<any>{
    const url = `${this.apiUrl}/song/getRandomSongs/${n}`
    return this.http.get(url)
  }


}
