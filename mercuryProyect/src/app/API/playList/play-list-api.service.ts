import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../auth/interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayListAPIService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }
  createPlayList(playList : {
    userId: string,
     name: string,
    datePublished: string,
    coverImage: string,
    songs: Song[],
    isPublic: boolean

  }):Observable<any>{
      const data = {
        userId: playList.userId,
        name: playList.name,
        isPublic: playList.isPublic
      }

      console.log("data: ",data)

      const url = `${this.apiUrl}/playlist`
      return this.http.post(url,data)
  }
  updatePlayList(playList: any, coverImage: string): Observable<any> {

    const data = {
      name: playList.name,
      isPublic: playList.is_public,
      id: playList.id,
      image: coverImage
    }
    const url = `${this.apiUrl}/playlist`;
    return this.http.put(url, data);
  }

  getPlayListByUserId(userId: number): Observable<any> {
    const url = `${this.apiUrl}/playlist/${userId}`;
    return this.http.get(url);
  }
}
