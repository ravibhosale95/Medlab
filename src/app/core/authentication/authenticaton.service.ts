import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatonService {

  constructor() { }

  getUserFromLocal() {
    var user: any;
    user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  }

  getTokenFromLocal() {
    var token: any;
    token = localStorage.getItem('authToken');
    if (token) {
      return token;
    }
    else{
      return null;
    }
  }
}
