import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static getItem(key) {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : null;
  }

  static setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key) {
    sessionStorage.removeItem(key);
  }

  static clearAll() {
    sessionStorage.clear();
  }

  static setUserToken(token, tokenType) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('tokenType', tokenType);
  }

  static getToken(): string {
    return sessionStorage.getItem('token');
  }

  constructor() {
  }
  
  public setUser(user) {
    sessionStorage.setItem('user', user);
  }
}
