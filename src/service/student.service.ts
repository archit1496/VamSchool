import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { BaseService } from 'src/service/base.service';
import { AppUrl } from 'src/constant/app-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{

  constructor(
    public http: HttpClient,public handler: HttpBackend
  ) { 
    super(http)
  }

  fetchStudentDetails(): Observable<any> {
    return this.studentGetRequest(AppUrl.STUDENT_COURSE_LIST);
  }
  fetchClassTodayData(): Observable<any> {
    return this.studentGetRequest(AppUrl.FETCH_CLASS_TODAY_DATA);
  }
  fetchDashboardActivity(): Observable<any> {
    return this.getRequest(AppUrl.FETCH_DASHBOARD_ACTIVITY);
  }
  fetchStudentSubject(): Observable<any> {
    return this.getRequest(AppUrl.FETCH_STUDENT_SUBJECT);
  }
  fetchTimeTable(): Observable<any>{
    return this.studentGetRequest(AppUrl.FETCH_TIMETABLE);
  }

  fetchAssignmentQuestionsSubject(): Observable<any>{
    return this.studentGetRequest(AppUrl.FETCH_ASSIGNMENT_QUESTIONS_SUBJECT);
  }
  fetchAssignmentQuestionsTopic(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_ASSIGNMENT_QUESTIONS_CHAPTER(id));
  }
  fetchAssignmentData(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_ASSIGNMENT_DATA(id));
  }
  fetchAssignmentTopicData(params): Observable<any>{
    return this.getRequest(AppUrl.FETCH_ASSIGNMENT_TOPIC_DETAIL(),params);
  }
  fetchNotes(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_NOTES(id));
  }
  fetchNotesQuestionsSubject(): Observable<any>{
    return this.studentGetRequest(AppUrl.FETCH_NOTES_QUESTIONS_SUBJECT);
  }
  fetchNotesActivity(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_NOTES_ACTIVITY);
  }
  fetchAssignmentActivity(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_ASSIGNMENT_ACTIVITY);
  }
  fetchNotesQuestionsTopic(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_NOTES_QUESTIONS_CHAPTER(id));
  }

  uploadAnswers(data): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    return this.http.post(AppUrl.UPLOAD_ANSWERS, data, { params, headers });
  }
  uploadAssignment(formData){
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    return this.http.post(AppUrl.UPLOAD_ASSIGNMENT, formData, { params, headers });
  }

  answers(): Observable<any>{
    return this.getRequest(AppUrl.ANSWERS);
  }

  fetchVideos(): Observable<any>{
    return this.getRequest(AppUrl.FETCH_UPLOADED_VIDEOS);
  }

  getTwilioToken(): Observable<any>{
    return this.getRequestNew(AppUrl.GET_TWILIO_TOKEN);
  }

}
