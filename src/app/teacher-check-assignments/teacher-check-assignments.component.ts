import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-check-assignments',
  templateUrl: './teacher-check-assignments.component.html',
  styleUrls: ['./teacher-check-assignments.component.css']
})
export class TeacherCheckAssignmentsComponent implements OnInit {
  isLoading = false;

  assignmentTopicsList = [];

  constructor(
    public teacherService: TeacherService
  ) {
  }

  ngOnInit() {
    this.getAssignmentData();
  }
  getAssignmentData() {
    const ids = JSON.parse(sessionStorage.getItem('teacherAndCourseId'));
    this.isLoading = true;
    this.teacherService.getAssignmentlist(ids.courseId).subscribe(res => {
      this.isLoading = false;

      this.assignmentTopicsList = res;

    });
  }
}
