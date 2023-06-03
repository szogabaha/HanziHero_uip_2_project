/**
 * File: auth.service.ts
 * The model logic for the user related functionalities
 *
 * Author: Gabor Szolnok
 */
import { Injectable } from '@angular/core';
import { User, Language } from '../model/user';
import { of } from 'rxjs';
import {MockDataBase} from './mock_database'

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  //Get all users from DB
  //
  private getUsers(): User[] {
    const usersString = sessionStorage.getItem(MockDataBase.USERS_STORAGE_KEY);
    if (usersString) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }

  //Set users to available users in the db
  //
  private setUsers(users: User[]): void {
    sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(users));
  }

  //Get a specific user from the DB identified by its id
  //
  private getUser(userId: number): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      return users[userIndex];
    } else {
      return null;
    }
  }

  //Get the currently logged-in user
  //
  getCurrentUser(): User | undefined {
    const userString = sessionStorage.getItem(MockDataBase.CURRENT_USER_STORAGE_KEY);
    if(userString) {
      return JSON.parse(userString)
    } else {
      return undefined;
    }
  }

  //Check credentials and log in user
  //
  login(username: string, password: string) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.userName === username && user.password === password);
    let currentUser = null;
    if (userIndex !== -1) {
      currentUser = users[userIndex];
      //Set currentUser to the logged in one
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return of(currentUser)
  }

  //Remove currentUser
  //
  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  //Create new user and update DB
  //
  register(username: string, password: string, email: string, reminder: boolean) {
    const users = this.getUsers();
    const newUser: User = { id: users.length + 1, userName: username,
                            password: password, email: email,
                            studyLanguage: Language.Chinese, sessionLength: 10, reminder: reminder};
    users.push(newUser);
    this.setUsers(users);
    return of(newUser);
  }


  //Change the users information (ID cannot be changed, the rest can.)
  //
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

    //Only change the parts that are given in the parameters
    modifiedUser.userName = userName ?? modifiedUser.userName;
    modifiedUser.email = email ?? modifiedUser.email;
    modifiedUser.password = password ?? modifiedUser.password;
    modifiedUser.sessionLength = sessionLength ?? modifiedUser.sessionLength;
    modifiedUser.studyLanguage = studyLanguage ?? modifiedUser.studyLanguage;
    modifiedUser.reminder = reminder ?? modifiedUser.reminder;

    //Update currentuser
    sessionStorage.setItem('currentUser', JSON.stringify(modifiedUser));
    //Update userDB
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === modifiedUser.id);
    users[userIndex] = modifiedUser
    sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(users));

  }

  //Delete currently logged in user from the db
  //This is used when the user requests to delete account.
  //
  deleteCurrentAccount(){
    const currentUser = this.getCurrentUser()
    if(!currentUser) {
      return
    }
    sessionStorage.removeItem(MockDataBase.CURRENT_USER_STORAGE_KEY)
    let users = this.getUsers()
    const userIndex = users.findIndex(user => user.id === currentUser.id);

    users.splice(userIndex, 1);
    sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(users))
  }
}


/************
// END of auth.service.ts
//************/
