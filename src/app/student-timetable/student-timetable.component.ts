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
  valueWithOutSubjectFilter;
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
      this.valueWithOutSubjectFilter=[...this.timeTableData];
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
    this.prepareFinalData();
    
  }

  prepareFinalData(){
    let mdata=[...this.mondayData];
    let tdata=[...this.tuesdayData];
    let wdata=[...this.wednesdayData];
    let thdata=[...this.thrusdayData];
    let fdata=[...this.fridayData];
    let sdata=[...this.saturdayData];
    
    for(let x=0;x<=4-mdata.length;x++)
    {
        this.mondayData.push({})
    }
    for(let x=0;x<=4-tdata.length;x++)
    {
        this.tuesdayData.push({})
    }
    for(let x=0;x<=4-wdata.length;x++)
    {
        this.wednesdayData.push({})
    }
    for(let x=0;x<=4-thdata.length;x++)
    {
        this.thrusdayData.push({})
    }
    for(let x=0;x<=4-fdata.length;x++)
    {
        this.fridayData.push({})
    }
    for(let x=0;x<=4-sdata.length;x++)
    {
        this.saturdayData.push({})
    }
  }
  subjectSelected(event){
    if(event==='All')
    {
      this.timeTableData=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.timeTableData.filter(elm=>elm.course.subject.subject_name==event);
      this.timeTableData=filterValue;
      console.log("ddddd",this.timeTableData);

    }
    this.prepareTimeTableData();
   
  }
}