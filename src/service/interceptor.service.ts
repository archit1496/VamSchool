import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import { StorageService } from './storage.service';
import { BaseService } from './base.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private _data: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._data.isLoading.next(true);

    let headers = {};
    // todo add token from shared service
    if (StorageService.getItem('token')) {
      headers['Authorization'] = 'Token ' + StorageService.getItem('token');
    }
    // if (this.globalService.getSelf() && this.globalService.getSelf().getCurrentEnvironment() && this.globalService.getSelf().getCurrentEnvironment().envMappingId) {
    //   headers['Env-id'] = this.globalService.getSelf().getCurrentEnvironment().envMappingId;
    // }
    // headers['company-Id'] = 1;
    const dupReq = request.clone({
      setHeaders: headers
    });

    return next.handle(dupReq);
  }

  handleError(err) {
    console.log(err, 'err');
    
  }
}

export const HtpInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
