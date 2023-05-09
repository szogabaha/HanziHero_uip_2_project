import { Injectable } from '@angular/core';
import { User, Language } from '../model/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private readonly USERS_STORAGE_KEY = 'users';
  private readonly CURRENT_USER_STORAGE_KEY = 'currentUser';

  private getUsers(): User[] {
    const usersString = sessionStorage.getItem(this.USERS_STORAGE_KEY);
    if (usersString) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }


  private setUsers(users: User[]): void {
    sessionStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }

  private getUser(userId: number): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      return users[userIndex];
    } else {
      return null;
    }
  }

  private getCurrentUser(): User | null {
    const userString = sessionStorage.getItem(this.CURRENT_USER_STORAGE_KEY);
    if(userString) {
      return JSON.parse(userString)
    } else {
      return null;
    }
  }

  login(username: string, password: string) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.userName === username && user.password === password);
    let currentUser = null;
    if (userIndex !== -1) {
      currentUser = users[userIndex];
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return of(currentUser)
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  register(username: string, password: string, email: string) {
    const users = this.getUsers();
    const newUser: User = { id: users.length + 1, userName: username,
                            password: password, email: email,
                            studyLanguage: Language.Chinese, sessionLength: 10};
    users.push(newUser);
    this.setUsers(users);
    return of(newUser);
  }
}


