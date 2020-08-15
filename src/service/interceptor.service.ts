import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import { StorageService } from './storage.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {};
    // todo add token from shared service
    if (StorageService.getItem('token')) {
      headers['Authorization'] = 'Token ' + StorageService.getItem('token');
    }
    // if (this.globalService.getSelf() && this.globalService.getSelf().getCurrentEnvironment() && this.globalService.getSelf().getCurrentEnvironment().envMappingId) {
    //   headers['Env-id'] = this.globalService.getSelf().getCurrentEnvironment().envMappingId;
    // }
    // headers['company-Id'] = 1;
    const dupReq = req.clone({
      setHeaders: headers
    });

    // console.log(headers);
    // return next.handle(dupReq);
    return next.handle(dupReq);
  }
}

export const HtpInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
