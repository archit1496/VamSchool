import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-students-main-page',
  templateUrl: './students-main-page.component.html',
  styleUrls: ['./students-main-page.component.css']
})
export class StudentsMainPageComponent implements OnInit {

  studentDataList = [];
  isLoading = false;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.fetchStudentDetails();
  }

  fetchStudentDetails() {
    this.isLoading = true;
    this.studentService.fetchStudentDetails().subscribe(res => {
      this.isLoading = false;
      this.studentDataList = res;
    });
  }

  oncardClick() {
    this.router.navigate(['/wrapper/student-dashboard/student-live-class']);
  }


}

