import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/service/base.service';
import { AppUrl } from 'src/constant/app-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{

  constructor(
    public http: HttpClient
  ) { 
    super(http)
  }

  fetchStudentDetails(): Observable<any> {
    return this.getRequest(AppUrl.STUDENT_COURSE_LIST);
  }

  fetchAssignmentQuestions(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_ASSIGNMENT_QUESTIONS);
  }

  fetchNotes(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_NOTES);
  }

  uploadAnswers(data): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    return this.http.post(AppUrl.UPLOAD_ANSWERS, data, { params, headers });
  }

  answers(): Observable<any>{
    return this.getRequest(AppUrl.ANSWERS);
  }

  fetchVideos(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_UPLOADED_VIDEOS);
  }


}
