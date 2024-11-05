import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserAPIService {


  private apiUrl = 'http://localhost:3000';

  
  constructor(private http: HttpClient) { }


  createUser(user: User){

      const data = {
         username: user.userName,
         email: user.email,
         password: user.password,
         birth: user.dateOfBirth,
         country: "COLOMBIA"
      }
      const url = `${this.apiUrl}/user`
      return this.http.post(url, data)
  }

   updateUser(user:any, id: string): Observable<any> {

    const data = {
      username: user.username,
      email: user.email,
      birth: user.birth,
      country: user.country,
      id: parseFloat(id),
      biography: user.biography,
      profile_picture: user.profile_picture
    }
    const url = `${this.apiUrl}/user`;
    return this.http.put(url, data);
  }

  getUserById(userId: string): Observable<any>{
      const url = `${this.apiUrl}/user/getById/${userId}`
      return this.http.get(url)
  }

  
}
