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
    return AppUrl.APP_URL + 'student/course/';
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
  static get FETCH_ASSIGNMENT_QUESTIONS(): string {
    return AppUrl.APP_URL + 'assignment-questions/course_assignments/?course=1';
  }
  
  static get ASSIGNMENT_LIST(): string {
    return AppUrl.APP_URL + 'assignment-questions/course_assignments/?course=';
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

  static get FETCH_NOTES(): string {
    return AppUrl.APP_URL + 'notes/?course=2';
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
    return AppUrl.APP_URL + 'video/?course=4'
  }
  
}