import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor() { }

  getUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user
    }
  }


}
