import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/constant/app-url';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService {

  constructor(public http: HttpClient, public handler: HttpBackend ) {
    super(http);

   }

 
  getTeacherCourselist(): Observable<any> {
    return this.getRequest(AppUrl.TEACHER_COURSE_LIST);
  }

  getStudentInCourselist(courseId): Observable<any> {
    return this.getRequest(AppUrl.STUDENT_IN_COURSE+courseId);
  }

  getAssignmentlist(courseId): Observable<any> {
    return this.getRequest(AppUrl.ASSIGNMENT_LIST+courseId);
  }

  getQuestionsList(questionId): Observable<any> {
    return this.getRequest(AppUrl.QUESTION_LIST+questionId);
  }

  updateMarks(questionId, data): Observable<any> {
    return this.patchRequest(AppUrl.MARKS_UPDATE() +questionId+'/', data);
  }

  uploadNotes(data): Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    return this.http.post(AppUrl.UPLOAD_NOTES, data, { params, headers });
  }

  selectVideo(data): Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', "application/json");
    let params = new HttpParams();
    return this.http.post(AppUrl.SELECT_VIDEO, data, { params, headers });
  }

  uploadVideo(formData, url): Observable<any>{
    this.http = new HttpClient(this.handler);
    let headers = {};
    // headers.set('Content-Type', null);
    // headers.set('Accept', "multipart/form-data");
    //headers['Authorization'] = null;
    //let params = new HttpParams();
    return this.http.post(AppUrl.UPLOAD_VIDEO(url), formData, { headers });
  }



}
