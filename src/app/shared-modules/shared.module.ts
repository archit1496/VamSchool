import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { AdminComponent } from '../admin/admin.component';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { TeacherNotesComponent } from '../teacher-notes/teacher-notes.component';
import { TeacherStudentListComponent } from '../teacher-student-list/teacher-student-list.component';
import { TeacherHomeWorkComponent } from '../teacher-home-work/teacher-home-work.component';
import { TeacherUploadVideoComponent } from '../teacher-upload-video/teacher-upload-video.component';
import { TeacherLiveClassComponent } from '../teacher-live-class/teacher-live-class.component';
import { TeacherCheckAssignmentsComponent } from '../teacher-check-assignments/teacher-check-assignments.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { StudentLiveClassComponent } from '../student-live-class/student-live-class.component';
import { StudentVideosComponent } from '../student-videos/student-videos.component';
import { StudentNotesComponent } from '../student-notes/student-notes.component';
import { TeachertimetableComponent } from '../teachertimetable/teachertimetable.component';
import { StudentHomeworkComponent } from '../student-homework/student-homework.component';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { StudentsMainPageComponent } from '../students-main-page/students-main-page.component';
import { TeacherNavbarComponent } from '../teacher-navbar/teacher-navbar.component';
import { HeaderComponent } from '../header/header.component';
import { HtpInterceptor } from 'src/service/interceptor.service';
import { TeacherMarksAssignmentComponent } from '../teacher-marks-assignment/teacher-marks-assignment.component';
import { SidebarSsComponent } from '../sidebar-ss/sidebar-ss.component';
import { StudentHomeDashboardComponent } from '../student-home-dashboard/student-home-dashboard.component';
import { StudentTimetableComponent } from '../student-timetable/student-timetable.component';
import { StudentAssignementsComponent } from '../student-assignements/student-assignements.component';

import { AgoraConfig, AngularAgoraRtcModule } from 'angular-agora-rtc';
import { ClassesComponent } from '../classes/classes.component';
import { StudentNavBarComponent } from '../student-nav-bar/student-nav-bar.component';
import { StudentClassSubjectComponent } from '../student-class-subject/student-class-subject.component';
import { StudentStudyMaterialComponent } from '../student-study-material/student-study-material.component';
import { AddNewAssignmentComponent } from '../teacher-check-assignments/add-new-assignment/add-new-assignment.component';
import { AdminboardComponent } from '../adminboard/adminboard.component';

const agoraConfig: AgoraConfig = {
  AppID: 'd93c22ae894740f6a8051d3d34f74da1',
};

@NgModule({
  declarations: [
    TeachertimetableComponent,
    AdminboardComponent,
    TeacherDashboardComponent,
    TeacherMarksAssignmentComponent,
    AdminComponent,
    WrapperComponent,
    TeacherNotesComponent,
    TeacherStudentListComponent,
    TeacherHomeWorkComponent,
    TeacherUploadVideoComponent,
    TeacherLiveClassComponent,
    TeacherCheckAssignmentsComponent,
    SideBarComponent,
    StudentDashboardComponent,
    StudentLiveClassComponent,
    StudentVideosComponent,
    StudentNotesComponent,
    StudentHomeworkComponent,
    SideBarComponent,
    StudentsMainPageComponent,
    TeacherNavbarComponent,
    HeaderComponent,
    SidebarSsComponent,
    // routingModule,
    StudentHomeDashboardComponent,
    StudentTimetableComponent,
    StudentAssignementsComponent,
    ClassesComponent,
    // routingModule,
    StudentNavBarComponent,
    StudentClassSubjectComponent,
    StudentStudyMaterialComponent,
    AddNewAssignmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
  ],
  exports: [
    TeachertimetableComponent,
    TeacherDashboardComponent,
    AdminComponent,
    WrapperComponent,
    TeacherNotesComponent,
    TeacherStudentListComponent,
    TeacherHomeWorkComponent,
    TeacherUploadVideoComponent,
    TeacherLiveClassComponent,
    TeacherCheckAssignmentsComponent,
    SideBarComponent,
    StudentDashboardComponent,
    StudentLiveClassComponent,
    StudentVideosComponent,
    StudentNotesComponent,
    StudentsMainPageComponent,
    TeacherNavbarComponent,
    HeaderComponent,
    SidebarSsComponent,
    StudentHomeDashboardComponent,
    StudentTimetableComponent,
    StudentAssignementsComponent,
    ClassesComponent,
    StudentNavBarComponent,
    StudentClassSubjectComponent,
    StudentStudyMaterialComponent,
    AddNewAssignmentComponent
  ],
  providers: [HtpInterceptor]
})
export class SharedModule { }
