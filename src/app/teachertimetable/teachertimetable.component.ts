import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html',
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit {
  dummyData: { class: string; when: string; }[];
  timeTableData: any;
  isLoading:boolean;
  mondayData;
  tuesdayData;
  wednesdayData;
  thrusdayData;
  fridayData;
  saturdayData;
  days=[
    "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"
  ]
  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.fetchTimetableForTeacher();
    // this.dummyData = [
    //   {
    //     "class": "X Std A",
    //     "when": "10:00"
    //   },
    //   {
    //     "class": "X Std B",
    //     "when": "11:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std C",
    //     "when": "12:00"
    //   },
    //   {
    //     "class": "X Std D",
    //     "when": "13:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   },
    //   {
    //     "class": "X Std E",
    //     "when": "14:00"
    //   }
    // ]
  }

  fetchTimetableForTeacher(){
    this.isLoading = true;

    this.teacherService.fetchTimetable().subscribe(res => {
      this.timeTableData = res;
    this.isLoading = false;
    this.prepareTimeTableData();

      // console.log("Response TT= "+JSON.stringify(this.timetableData))
    })
  }

  prepareTimeTableData(){
    this.mondayData=this.timeTableData.filter(elm=>elm.day.day=='Monday');
    this.tuesdayData=this.timeTableData.filter(elm=>elm.day.day=='Tuesday');
    this.wednesdayData=this.timeTableData.filter(elm=>elm.day.day=='Wednesday');
    this.thrusdayData=this.timeTableData.filter(elm=>elm.day.day=='Thursday');
    this.fridayData=this.timeTableData.filter(elm=>elm.day.day=='Friday');
    this.saturdayData=this.timeTableData.filter(elm=>elm.day.day=='Saturday');
    
  }

}
