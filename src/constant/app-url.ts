import { StorageService } from 'src/service/storage.service';
import {environment} from '../environments/environment';

export class AppUrl {

  static get APP_URL(): string {
    return environment.appUrl;
  }
  static get AUTH(): string {
    return AppUrl.APP_URL + 'users/login_with_password/';
  }
  static get Logout(): string {
    return AppUrl.APP_URL + 'users/logout/';
  }
  static get TEACHER_COURSE_LIST(): string {
    return AppUrl.APP_URL + 'teacher/course/';
  }

  static get STUDENT_COURSE_LIST(): string {
    return AppUrl.APP_URL + 'v1/student/dashboard/';
  }
  static get FETCH_CLASS_TODAY_DATA(): string {
    return AppUrl.APP_URL + `v1/student/${StorageService.getItem('class_id')}/time-table/?today=true`;
  }
  static get STUDENT_IN_COURSE(): string {
    return AppUrl.APP_URL + 'course/students_in_course/?course_id=';
  }

  static get ADMIN_DETAILS(): string {
    return AppUrl.APP_URL + 'school/admin_dashboard/';
  }

  static uploadDocs(): string {
    return AppUrl.APP_URL + 'assignment-questions/';
  }
  static get FETCH_ASSIGNMENT_QUESTIONS_SUBJECT(): string {
    return AppUrl.APP_URL + "v1/student/dir/?dir_type=1";
  }
  static get FETCH_NOTES_QUESTIONS_SUBJECT(): string {
    return AppUrl.APP_URL + "v1/student/dir/?dir_type=0";
  }
  static FETCH_ASSIGNMENT_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/student/dir/?sub_dir=${id}`;
  }
  static FETCH_NOTES_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/student/dir/?sub_dir=${id}`;
  }
  static FETCH_ASSIGNMENT_DATA(id): string {
    return AppUrl.APP_URL + `v1/student/dir/${id}/assignment_question/`;
  }
  static get FETCH_TIMETABLE(): string {
    return AppUrl.APP_URL + `v1/student/${StorageService.getItem('class_id')}/time-table/`;
  }
  static get ASSIGNMENT_LIST(): string {
    return AppUrl.APP_URL + 'evaluate-answer';
  }

    
  static get QUESTION_LIST(): string {
    return AppUrl.APP_URL + 'evaluate-answer/?question=';
  }

  // static get ASSIGNMENT_LIST2(): string {
  //   return AppUrl.APP_URL + 'evaluate-answer/?teacher=teacgeod';
  // }

  static MARKS_UPDATE(): string {
    return AppUrl.APP_URL + 'evaluate-answer/';
  }

  static FETCH_NOTES(id): string {
    return AppUrl.APP_URL + `v1/student/dir/${id}/notes/`;
  }

  static get UPLOAD_ANSWERS(): string{
    return AppUrl.APP_URL + 'answer/';
  }

  static get ANSWERS(): string {
    return AppUrl.APP_URL + 'answer/';
  }

  static get UPLOAD_NOTES(): string {
    return AppUrl.APP_URL + 'notes/';
  }
  
  static get SELECT_VIDEO(): string {
    return AppUrl.APP_URL + 'video/';
  }

  static UPLOAD_VIDEO(url): string {
    return url;
  }

  static get FETCH_UPLOADED_VIDEOS(): string {
    return AppUrl.APP_URL + 'video/?course=4';
  }

  static get GET_TWILIO_TOKEN(): string {
    return AppUrl.APP_URL + 'course/token';
  }

  static CREATE_MEETING(): string {
    return AppUrl.APP_URL + 'course/create_live_class/';
  }

  static get GET_MEETING(): string {
    return AppUrl.APP_URL + 'course/live_class/?course_id=4';
  }

  static get FETCHTEACHER(): string {
    return AppUrl.APP_URL + 'v1/teacher/dashboard';
  }
  
  static get FETCHTEACHERCOURSE(): string {
    return AppUrl.APP_URL + 'v1/teacher/course';
  }

  static get FETCH_TEACHER_TIMETABLE(): string {
    return AppUrl.APP_URL + 'v1/teacher/time-table/';
  }

  static get FETCH_TEACHER_TIMETABLE_TODAY(): string {
    return AppUrl.APP_URL + 'v1/teacher/time-table/?today=true';
  }
}