import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { email, password };
  
    return this.http.post(url, body);
  }
}
