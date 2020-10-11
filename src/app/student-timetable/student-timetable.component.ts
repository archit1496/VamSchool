import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css']
})
export class StudentTimetableComponent implements OnInit {
  isLoading:boolean;
  timeTableData=[];
  dummyData = [
    {
      "subject":'Physics',
      "time":"10:00 Am"
    },
    {
      "subject":'Chemistry',
      "time":"10:00 Am"
    },
    {
      "subject":'Maths',
      "time":"10:00 Am"
    },
    {
      "subject":'Physics',
      "time":"10:00 Am"
    },
    {
      "subject":'Chemistry',
      "time":"10:00 Am"
    },
    {
      "subject":'Maths',
      "time":"10:00 Am"
    },
    {
      "subject":'Chemistry',
      "time":"10:00 Am"
    },
    {
      "subject":'Physics',
      "time":"10:00 Am"
    },
  ]
  constructor(public studentService:StudentService) {
    this.fetchTimeTableData();
   }

  ngOnInit() {
  }
  fetchTimeTableData() {
    this.isLoading = true;
    this.studentService.fetchTimeTable().subscribe(res => {
      this.isLoading = false;
      this.timeTableData = res;
    });
  }
}
