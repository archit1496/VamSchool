import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BaseService } from './base.service';
import { AppUrl } from 'src/constant/app-url';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor(public http: HttpClient) {
    super(http);
  }

  authenticate(data): Observable<any> {
    return this.postRequest(AppUrl.AUTH, data);
  }
  
  logout() {
     return this.postRequest(AppUrl.Logout);
  }

}
