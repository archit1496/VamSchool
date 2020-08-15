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
  teacherCourseList = [];
  constructor(
    private router: Router,public authService:AuthService,public teacherService:TeacherService
  ) { }

  ngOnInit() {
    this.getTeacherList();
  }
  
  getTeacherList(){
    this.teacherService.getTeacherCourselist().subscribe(res=>{
       this.teacherCourseList=res;
    })
  } 
  gotoClassroom(id: number){
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     teacherId: this.teacherCourseList[0].id,
    //     courseId: id,
    //   }
    // };
    const data = {
          teacherId: this.teacherCourseList[0].id,
          courseId: id,
        };
    sessionStorage.setItem('teacherAndCourseId', JSON.stringify(data));
    this.router.navigate(['/wrapper/teacherdashboard/teacherliveclass']);
  }

}
