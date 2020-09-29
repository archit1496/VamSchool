import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  dummyData: { class: string; when: string; }[];

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.dummyData = [
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
  }

}
