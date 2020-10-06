import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css']
})
export class StudentTimetableComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
