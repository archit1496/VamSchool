import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-assignements',
  templateUrl: './student-assignements.component.html',
  styleUrls: ['./student-assignements.component.css']
})
export class StudentAssignementsComponent implements OnInit {
  dummyData = [
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Physics'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    // {
    //   "noOfFiles": "10 Files",
    //   "update": "Last Update Today",
    //   "subject":'Maths'
    // },
  ]
  constructor() { }

  ngOnInit() {
  }

}