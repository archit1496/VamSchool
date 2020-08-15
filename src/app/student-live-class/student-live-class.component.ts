import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-live-class',
  templateUrl: './student-live-class.component.html',
  styleUrls: ['./student-live-class.component.css']
})
export class StudentLiveClassComponent implements OnInit {

  dummyList = [];

  constructor() { }

  ngOnInit() {
    this.dummyList = [
      {
        "topic": "Ch. 1 Introduction"
      },
      {
        "topic": "Ch. 2 Introduction Part-2"
      },
      {
        "topic": "Ch. 3 Evolution"
      },
      {
        "topic": "Ch. 4 Evolution Part-2"
      },
      {
        "topic": "Ch. 5 Evolution Part-3"
      }
    ]
  }

}
