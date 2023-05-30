import { Injectable } from '@angular/core';
import { User, Language } from '../model/user';
import { of } from 'rxjs';
import {MockDataBase} from './mock_database'

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  private getUsers(): User[] {
    const usersString = sessionStorage.getItem(MockDataBase.USERS_STORAGE_KEY);
    if (usersString) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }


  private setUsers(users: User[]): void {
    sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(users));
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

  getCurrentUser(): User | undefined {
    const userString = sessionStorage.getItem(MockDataBase.CURRENT_USER_STORAGE_KEY);
    if(userString) {
      return JSON.parse(userString)
    } else {
      return undefined;
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

  register(username: string, password: string, email: string, reminder: boolean) {
    const users = this.getUsers();
    const newUser: User = { id: users.length + 1, userName: username,
                            password: password, email: email,
                            studyLanguage: Language.Chinese, sessionLength: 10, reminder: reminder};
    users.push(newUser);
    this.setUsers(users);
    return of(newUser);
  }


  updateCurrentUser(
    userName?: string,
    email?: string,
    password?: string,
    sessionLength?: number,
    studyLanguage?: Language,
    reminder?: boolean)
  {
    const modifiedUser = this.getCurrentUser();

    if (!modifiedUser) {
      return;
    }

    modifiedUser.userName = userName ?? modifiedUser.userName;
    modifiedUser.email = email ?? modifiedUser.email;
    modifiedUser.password = password ?? modifiedUser.password;
    modifiedUser.sessionLength = sessionLength ?? modifiedUser.sessionLength;
    modifiedUser.studyLanguage = studyLanguage ?? modifiedUser.studyLanguage;
    modifiedUser.reminder = reminder ?? modifiedUser.reminder;


    sessionStorage.setItem('currentUser', JSON.stringify(modifiedUser));
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === modifiedUser.id);
    users[userIndex] = modifiedUser
    sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(users));

  }
}


