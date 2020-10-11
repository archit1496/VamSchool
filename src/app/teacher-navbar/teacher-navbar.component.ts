import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { StorageService } from 'src/service/storage.service';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css']
})
export class TeacherNavbarComponent implements OnInit {
  
  teacherData: any;

  constructor(
    private router: Router, public authService: AuthService, public teacherService: TeacherService) {
    this.fetchTeacher();
  }

  ngOnInit() {
  }

  fetchTeacher() {
    this.teacherService.fetchTeacher().subscribe(res => {
      this.teacherData = res;
      console.log("Teacher Data 12= " + this.teacherData)
    })
  }
  gotoClassroom(id: number) {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     teacherId: this.teacherCourseList[0].id,
    //     courseId: id,
    //   }
    // };
    // const data = {
    //       teacherId: this.teacherCourseList[0].id,
    //       courseId: id,
    //     };
    // sessionStorage.setItem('teacherAndCourseId', JSON.stringify(data));
    // this.router.navigate(['/wrapper/teacherdashboard/teacherliveclass']);
  }

}
