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

    // console.log(headers);
    // return next.handle(dupReq);

    return new Observable(observer => {
      const subscription = next.handle(dupReq)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(dupReq);
              observer.next(event);
            }
          },
          err => { this.removeRequest(dupReq); observer.error(err); this.handleError(err); },
          () => { this.removeRequest(dupReq); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(dupReq);
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    let isDbDownload = false;

    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (!this.requests.length && !isDbDownload) {
      this._data.isLoading.next(false);
    }
  }

  handleError(err) {
    console.log(err, 'err');
    
  }
}

export const HtpInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
