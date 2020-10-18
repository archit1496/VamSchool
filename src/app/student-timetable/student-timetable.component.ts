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
  mondayData;
  tuesdayData;
  wednesdayData;
  thrusdayData;
  fridayData;
  saturdayData;
  days=[
    "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"
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
      this.prepareTimeTableData();
    });
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
