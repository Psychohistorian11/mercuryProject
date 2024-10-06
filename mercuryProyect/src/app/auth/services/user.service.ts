import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() { }

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
    if (
      this.mailIsRepeated(user.email) ||
      this.usernameIsRepeated(user.userName)
    ) {
      return false;
    } else {
      this.addUser(user);
      return true;
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
    const users = [...this.getUsers(), user];
    localStorage.setItem('users', JSON.stringify(users));
  }
}
