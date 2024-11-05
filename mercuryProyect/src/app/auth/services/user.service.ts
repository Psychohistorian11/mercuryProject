import { Injectable } from '@angular/core';
import { Artist, User } from '../interfaces/user.interface';
import { UserAPIService } from '../../API/user/user-api.service';
import { Router } from '@angular/router';
import { ArtistAPIService } from '../../API/artist/artist-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private userAPIService: UserAPIService,
              private artistAPIService: ArtistAPIService, 
              private router: Router

  ) { }

  login(email: string, password: string) {
    if (this.isUserAndPasswordCorrect(email, password)) {
      const user = this.findUserinUsersWithEmail(email);
      localStorage.setItem(
        'user',
        JSON.stringify({ id: user.id, userName: user.userName, email: user.email, role: user.role, dateOfBirth: user.dateOfBirth })
      );
      return user.role;
    } else {
      localStorage.removeItem('user');
      return false;
    }
  }

  register(user: User) {
      if(user.role === "hearer"){
        this.addUser(user);
      }else if(user.role === "artist"){
        this.addArtist(user)
      }

  }

  private isUserAndPasswordCorrect(mail: string, password: string) {
    const users = this.getUsers();
    return users.some((user: User) => {
      if (user.email === mail && user.password === password) {
        return true;
      }
      return false;
    });
  }
  private getUsers() {
    const users = localStorage.getItem('users');
    if (!users) {
      return [];
    } else {
      return JSON.parse(users);
    }
  }

  private findUserinUsersWithEmail(email: string) {
    const users = this.getUsers();
    return users.find((user: User) => user.email === email);
  }

  private mailIsRepeated(email: string) {
    const users = this.getUsers();
    const isRepeated = users.some((user: User) => user.email === email);
    return isRepeated;
  }
  private usernameIsRepeated(userName: string) {
    const users = this.getUsers();
    const isRepeated = users.some((user: User) => user.userName === userName);
    return isRepeated;
  }
  private addUser(user: User) {

    this.userAPIService.createUser(user).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
      }
    });
    //const users = [...this.getUsers(), user];
    //localStorage.setItem('users', JSON.stringify(users));

  }

  private addArtist(user: Artist){
    this.artistAPIService.createArtist(user).subscribe({
      next: (response) => {
        console.log('Artista creado exitosamente:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al crear el artista:', error);
      }
    })
  }

}
