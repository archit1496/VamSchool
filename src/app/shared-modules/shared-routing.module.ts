import { AdminboardComponent } from './../adminboard/adminboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WrapperComponent } from '../wrapper/wrapper.component';
import { AdminComponent } from '../admin/admin.component';
import { TeachertimetableComponent } from '../teachertimetable/teachertimetable.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { TeacherNotesComponent } from '../teacher-notes/teacher-notes.component';
import { TeacherStudentListComponent } from '../teacher-student-list/teacher-student-list.component';
import { TeacherUploadVideoComponent } from '../teacher-upload-video/teacher-upload-video.component';
import { TeacherLiveClassComponent } from '../teacher-live-class/teacher-live-class.component';
import { TeacherHomeWorkComponent } from '../teacher-home-work/teacher-home-work.component';
import { TeacherCheckAssignmentsComponent } from '../teacher-check-assignments/teacher-check-assignments.component';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { StudentLiveClassComponent } from '../student-live-class/student-live-class.component';
import { StudentNotesComponent } from '../student-notes/student-notes.component';
import { StudentVideosComponent } from '../student-videos/student-videos.component';
import { StudentHomeworkComponent } from '../student-homework/student-homework.component';
import { StudentsMainPageComponent } from '../students-main-page/students-main-page.component';
import { TeacherNavbarComponent } from '../teacher-navbar/teacher-navbar.component';
import { HeaderComponent } from '../header/header.component';
import { TeacherMarksAssignmentComponent } from '../teacher-marks-assignment/teacher-marks-assignment.component';
import { StudentHomeDashboardComponent } from '../student-home-dashboard/student-home-dashboard.component';
import { StudentTimetableComponent } from '../student-timetable/student-timetable.component';
import { StudentAssignementsComponent } from '../student-assignements/student-assignements.component';
import { StudentStudyMaterialComponent } from '../student-study-material/student-study-material.component';

const routes: Routes = [
  {
    path: '', component: WrapperComponent, children: [

      // { path: 'teachertimetable', component: TeachertimetableComponent },
      { path: 'studashboard', component: StudentHomeDashboardComponent },
      { path: 'stutimetable', component: StudentTimetableComponent },
      { path: 'stuassignments', component: StudentAssignementsComponent },
      // { path: 'teacherdashboard', component: TeacherDashboardComponent },
      // { path: 'teachernotes', component: TeacherNotesComponent },
      { path: 'teacheruploadvideo', component: TeacherUploadVideoComponent },
      { path: 'teacherliveclass', component: TeacherLiveClassComponent },
      { path: 'teacherhomework', component: TeacherHomeWorkComponent },
      { path: 'teacheractivity', component: TeacherStudentListComponent },
      // { path: 'teachercheckassignments', component: TeacherCheckAssignmentsComponent },
      { path: 'teachermarksassignments/:topicId', component: TeacherMarksAssignmentComponent },
      { path: 'studentStudyMaterial', component: StudentStudyMaterialComponent },
    

      // {
      //   path: 'teacher-main-page', component: TeacherNavbarComponent, children: [
      //     { path: 'header', component: HeaderComponent }
      //   ]
      // },
      { path: 'admin', component: AdminComponent, children: [
          { path: '', redirectTo: '/wrapper/admin/adminboard', pathMatch: 'full' },
          {path: 'adminboard', component: AdminboardComponent},
        ]
      },
      {
        path: 'teacherNav', component: TeacherNavbarComponent, children: [
          { path: '', redirectTo: '/wrapper/teacherNav/teacherdashboard', pathMatch: 'full' },
          {path: 'teacherdashboard', component: TeacherDashboardComponent},
          { path: 'teachertimetable', component: TeachertimetableComponent },
          { path: 'teachercheckassignments', component: TeacherCheckAssignmentsComponent },
          { path: 'teachernotes', component: TeacherNotesComponent },
        ]
      },
      {
        path: 'student-dashboard', component: StudentDashboardComponent, children: [
          { path: 'student-live-class', component: StudentLiveClassComponent },
          { path: 'student-videos', component: StudentVideosComponent },
          { path: 'student-homework', component: StudentHomeworkComponent },
          { path: 'student-notes', component: StudentNotesComponent }
        ]
      },
      {
        path: 'student-main-page', component: StudentsMainPageComponent, children: [
          { path: 'header', component: HeaderComponent }
        ]
      },

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
// export const routingModule = TeacherLiveClassComponent;