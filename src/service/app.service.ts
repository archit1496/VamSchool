import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/service/base.service';
import { AppUrl } from 'src/constant/app-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService{

  constructor(
    public http: HttpClient
  ) { 
    super(http)
  }

  fetchAdminDetails(): Observable<any>{
    return this.getRequest(AppUrl.ADMIN_DETAILS);
  }


}
