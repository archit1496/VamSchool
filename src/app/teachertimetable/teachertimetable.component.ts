import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html',
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit {
  dummyData: { class: string; when: string; }[];

  constructor() { }

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
      },
      {
        "class": "X Std E",
        "when": "14:00"
      },
      {
        "class": "X Std E",
        "when": "14:00"
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
      },
      {
        "class": "X Std E",
        "when": "14:00"
      },
      {
        "class": "X Std E",
        "when": "14:00"
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
      },
      {
        "class": "X Std E",
        "when": "14:00"
      },
      {
        "class": "X Std E",
        "when": "14:00"
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
      },
      {
        "class": "X Std E",
        "when": "14:00"
      }
    ]
  }

}
