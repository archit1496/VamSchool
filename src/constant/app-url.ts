import { StorageService } from 'src/service/storage.service';
import { environment } from '../environments/environment';

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
  static get register(): string {
    return AppUrl.APP_URL + 'users/register/';
  }
  static get FORGOT_PASSWORD(): string {
    return AppUrl.APP_URL + 'users/forgot-password/';
  }
  static get CHANGE_PASSWORD(): string {
    return AppUrl.APP_URL + '/v1/reset-password/';
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
  static FETCH_MEETING_ID_PASSWORD(course_id): string {
    return AppUrl.APP_URL + `v1/student/get-course?course=${course_id}`;
  }
  static get FETCH_DASHBOARD_ACTIVITY(): string {
    return AppUrl.APP_URL + `v1/student/dashboard/activity/`;
  }
  static get FETCH_STUDENT_SUBJECT(): string {
    return AppUrl.APP_URL + `v1/student/subject/`;
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

  static FETCH_ASSIGNMENT_QUESTIONS_SUBJECT2(subject_id): string {
    return AppUrl.APP_URL + `v1/student/dir/?subject=${subject_id}`;
  }

  static get FETCH_TEACHER_ASSIGNMENT_QUESTIONS_SUBJECT(): string {
    return AppUrl.APP_URL + "v1/teacher/dir/?dir_type=1";
  }

  static FETCH_TEACHER_DASHBOARD_ACTIVITY(week): string {
    return AppUrl.APP_URL + "v1/teacher/assignment-answer?" + week;
  }
  static  TEACHER_NOTES(folder_id, url): string {
    return AppUrl.APP_URL + `v1/teacher/study-material/dir/${folder_id}/${url}/`;
  }
  static UPDATE_TEACHER_DASHBOARD_ASSIGNMENT(id): string {
    return AppUrl.APP_URL + "v1/teacher/assignment-answers/" + id + '/';
  }

  static get FETCH_NOTES_ACTIVITY(): string {
    return AppUrl.APP_URL + "v1/student/notes/activity/";
  }
  static get FETCH_ASSIGNMENT_ACTIVITY(): string {
    return AppUrl.APP_URL + "v1/student/assignment/answers/";
  }
  static get FETCH_NOTES_QUESTIONS_SUBJECT(): string {
    return AppUrl.APP_URL + "v1/student/dir/?dir_type=0";
  }
  static get FETCH_TEACHER_NOTES_QUESTIONS_SUBJECT(): string {
    return AppUrl.APP_URL + "v1/teacher/dir/?dir_type=0";
  }
  static FETCH_ASSIGNMENT_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/student/dir/?sub_dir=${id}`;
  }

  static FETCH_ZOOM_DETAILS(): string {
    return AppUrl.APP_URL + `v1/student/course`;
  }

  

  static FETCH_TEACHER_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/teacher/dir/?sub_dir=${id}`;
  }
  static FETCH_NOTES_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/student/dir/?sub_dir=${id}`;
  }
  static FETCH_NOTES_QUESTIONS_CHAPTER2(course_id): string {
    return AppUrl.APP_URL + `v1/student/dir/study-material-topics/?subject=${course_id}`;
  }
  static FETCH_TEACHER_NOTES_QUESTIONS_CHAPTER(id): string {
    return AppUrl.APP_URL + `v1/teacher/dir/?sub_dir=${id}`;
  }
  static FETCH_ASSIGNMENT_DATA(id): string {
    return AppUrl.APP_URL + `v1/student/dir/${id}/assignment_question/`;
  }
  static FETCH_ASSIGNMENT_TOPIC_DETAIL(): string {
    return AppUrl.APP_URL + `v1/student/assignment/answers/`;
  }
  static FETCH_TEACHER_ASSIGNMENT_DATA(id): string {
    return AppUrl.APP_URL + `v1/teacher/dir/${id}/assignment-questions/`;
  }

  static FETCH_STUDY_MATERIAL_DATA(id): string {
    return AppUrl.APP_URL + `v1/teacher/study-material/${id}/dir/`;
  }

  static FETCH_TEACHER_ASSIGNMENT_DATANew(): string {
    return AppUrl.APP_URL + `v1/teacher/create-assignment-topic-dir/`;
  }

  static FETCH_TEACHER_ASSIGNMENT_DATA2(): string {
    return AppUrl.APP_URL + `v1/teacher/get-assignment-topic-dir/`;
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

  static FETCH_NOTES2(dir_id, url): string {
    return AppUrl.APP_URL + `v1/student/dir/study-material-topics/${dir_id}?type=${url}`;
  }

  static FETCH_TEACHER_NOTES(id): string {
    return AppUrl.APP_URL + `v1/teacher/dir/${id}/notes/`;
  }

  static UPDATE_TEACHER_NOTES(): string {
    return AppUrl.APP_URL + `v1/teacher/dir/`;
  }


  static get UPLOAD_ANSWERS(): string {
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
  static get UPLOAD_ASSIGNMENT(): string {
    return AppUrl.APP_URL + 'v1/student/assignment/answers/';
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

  static FETCH_SELECTED_TEACHER_COURSE(): string {
    return AppUrl.APP_URL + 'v1/teacher/selected-course/';
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