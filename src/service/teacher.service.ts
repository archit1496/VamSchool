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

   teacherDetails;
 
  getTeacherCourselist(): Observable<any> {
    return this.getRequest(AppUrl.TEACHER_COURSE_LIST);
  }

  getStudentInCourselist(courseId): Observable<any> {
    return this.getRequest(AppUrl.STUDENT_IN_COURSE+courseId);
  }

  getTeacherNotes(folder_id, url): Observable<any> {
    return this.getRequest2(AppUrl.TEACHER_NOTES(folder_id, url));
  }

  getAssignmentlist(courseId, when): Observable<any> {
    return this.getRequest(AppUrl.ASSIGNMENT_LIST+'?week='+when );
  }

  getQuestionsList(questionId): Observable<any> {
    return this.getRequest(AppUrl.QUESTION_LIST+questionId);
  }

  updateMarks(questionId, data): Observable<any> {
    return this.patchRequest(AppUrl.MARKS_UPDATE() +questionId+'/', data);
  }

  updateAssignmentMarks(questionId, data): Observable<any> {
    return this.patchRequest(AppUrl.UPDATE_TEACHER_DASHBOARD_ASSIGNMENT(questionId), data);
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

  createZoomMeeting(topic,agenda,courseId): Observable<any> {
    let params = new HttpParams().set("topic", topic).set("agenda", agenda).set("course_id", courseId);
    return this.postRequest(AppUrl.CREATE_MEETING(), params);
  }

  getMeetingDetails(): Observable<any> {
    return this.getRequest(AppUrl.GET_MEETING);
  }

  fetchTeacher(): Observable<any> {
    return this.getRequestNew(AppUrl.FETCHTEACHER);
  }

  fetchTeacherCourse(): Observable<any> {
    return this.getRequestNew(AppUrl.FETCHTEACHERCOURSE);
  }

  fetchSelectedTeacherCourse(course_id): Observable<any> {
    let params = new HttpParams().set("course_id", course_id);
    return this.postRequest(AppUrl.FETCH_SELECTED_TEACHER_COURSE(),params );
    // return this.getRequestNew(AppUrl.FETCHSELECTEDTEACHERCOURSE);
  }
  
  // fetchNotes(): Observable<any>{
  //   return this.getRequest(AppUrl.FETCH_NOTES);
  // }

  fetchTimetable(): Observable<any>{
    return this.getRequestNew(AppUrl.FETCH_TEACHER_TIMETABLE);
  }

  fetchTimetableToday(): Observable<any>{
    return this.getRequestNew(AppUrl.FETCH_TEACHER_TIMETABLE_TODAY);
  }
  
  fetchAssignmentQuestionsSubject(): Observable<any>{
    return this.getRequest2(AppUrl.FETCH_TEACHER_ASSIGNMENT_QUESTIONS_SUBJECT);
  }

  fetchTeacherDashboardActivity(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_TEACHER_DASHBOARD_ACTIVITY(id));
  }
  // fetchAssignmentQuestionsTopic(id): Observable<any>{
  //   return this.getRequest(AppUrl.FETCH_TEACHER_QUESTIONS_CHAPTER(id));
  // }
  fetchAssignmentData(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_TEACHER_ASSIGNMENT_DATA(id));
  }
  fetchAssignmentData2(obj): Observable<any>{
    return this.postRequest(AppUrl.FETCH_TEACHER_ASSIGNMENT_DATA2(), obj);
  }

  fetchNoteData(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_STUDY_MATERIAL_DATA(id));
  }
  postNotesData(obj, id): Observable<any>{
    return this.postRequest(AppUrl.FETCH_STUDY_MATERIAL_DATA(id), obj);
  }

  addNewAssignmentData(id, obj): Observable<any>{
    return this.postRequest(AppUrl.FETCH_TEACHER_ASSIGNMENT_DATA(id), obj);
  }
  addNewAssignmentData2(obj): Observable<any>{
    return this.postRequest(AppUrl.FETCH_TEACHER_ASSIGNMENT_DATANew(), obj);
  }

  fetchNotesQuestionsSubject(): Observable<any>{
    return this.getRequest2(AppUrl.FETCH_TEACHER_NOTES_QUESTIONS_SUBJECT);
  }
  fetchNotesQuestionsTopic(id): Observable<any>{
    return this.getRequest2(AppUrl.FETCH_TEACHER_NOTES_QUESTIONS_CHAPTER(id));
  }
  fetchNotes(id): Observable<any>{
    return this.getRequest(AppUrl.FETCH_TEACHER_NOTES(id));
  }

  updateNotes(id, data, url): Observable<any>{
    return this.postRequest(AppUrl.TEACHER_NOTES(id, url), data);
  }

  updateTeacherNotesTopic(data){
    return this.postRequest(AppUrl.UPDATE_TEACHER_NOTES(), data);
  }
}
