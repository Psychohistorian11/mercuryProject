import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtistAPIService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  createArtist(user: Artist){

    const userAPI = {
       name: user.userName,
       email: user.email,
       password: user.password,
       country: "COLOMBIA"
    }
    const url = `${this.apiUrl}/artist`
    return this.http.post(url, userAPI)
}

  updateArtist(artist: any, artistId: string): Observable<any> {
    const data = {
      name: artist.username,
      email: artist.email,
      country: artist.country,
      id: artistId,
      image: artist.profile_picture
    }
    const url = `${this.apiUrl}/artist`;
    return this.http.put(url, data);
  }

  getArtistById(artistId: string):Observable<any>{
    const url = `${this.apiUrl}/artist/getById/${artistId}`
    return this.http.get(url)
  }

  getArtistsByWord(input: string): Observable<any>{
    const url = `${this.apiUrl}/artist/getArtistsByWord/${input}`
    return this.http.get(url)
  }
}
