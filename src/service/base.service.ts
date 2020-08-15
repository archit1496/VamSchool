
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class BaseService {
  constructor(public http: HttpClient) {
  }

  public joinMessages(array) {
    let string = '';
    array.forEach(message => {
      string = string + message;
    });
    return string;
  }

  public postRequest(url, data = {}) {
    
    return this.http.post(url, data).pipe(
      map(res => {
        
        return res;
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }


  public patchRequest(url, data = {}) {
    return this.http.patch(url, data).pipe(
      map(res => {
       
        return res;
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  public deleteRequest(url, data = {}) {
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    }
    return this.http.delete(url, options).pipe(
      map(res => {
       
        return res;
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  public putRequest(url, data = {}, deleteEmptyKeys = true) {
    
    return this.http.put(url, data).pipe(
      map(res => {
       
        return res;
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  public getRequest(url, params = {}) {
    return this.http.get(url, {params}).pipe(
      map(res => {
        return res['data'];
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    console.log(error);
    switch (error.error.type) {
      case 'INTERNAL_SERVER_ERROR':
      case 'FORBIDDEN_ERROR':
      case 'INVALID_CREDENTIALS':
      case 'BUSINESS_LOGIC_ERROR':
      case 'RESOURCE_NOT_FOUND':
       
        return throwError(error.error.error);
      case 'VALIDATION':
        
    }
    return throwError(error);
  }

  
}
