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
  dummyData;
  classesDummyData: { class: string; when: string; }[];

  constructor(
    public teacherService: TeacherService
  ) {
  }

  ngOnInit() {
    this.dummyData = [
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      },
      {
        "name": "Ram",
        "topic": "Law of Thermodynamic",
        "numOfPages": "6"
      }
    ];

    this.classesDummyData = [
      {
        "class": "X Std A",
        "when": "10:00"
      },
      {
        "class": "X Std B",
        "when": "11:00"
      },
      {
        "class": "X Std C",
        "when": "12:00"
      },
      {
        "class": "X Std D",
        "when": "13:00"
      },
      {
        "class": "X Std E",
        "when": "14:00"
      }
    ]
    //this.getAssignmentData();
  }

  // getAssignmentData() {
  //   const ids = JSON.parse(sessionStorage.getItem('teacherAndCourseId'));
  //   this.isLoading = true;
  //   this.teacherService.getAssignmentlist(ids.courseId).subscribe(res => {
  //     this.isLoading = false;

  //     this.assignmentTopicsList = res;

  //   });
  // }
}
