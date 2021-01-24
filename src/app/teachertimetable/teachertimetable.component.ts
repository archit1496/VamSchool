import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html',
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit {
  dummyData: { class: string; when: string; }[];
  timeTableData = [];
  isLoading:boolean;
  mondayData;
  tuesdayData;
  wednesdayData;
  thrusdayData;
  fridayData;
  saturdayData;
  sundayData;

  days=[
    "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday", "Sunday"
  ]
  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.fetchTimetableForTeacher();
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
    this.sundayData=this.timeTableData.filter(elm=>elm.day.day=='Sunday');

    this.prepareFinalData();
    
  }
  prepareFinalData(){
    let mdata=[...this.mondayData];
    let tdata=[...this.tuesdayData];
    let wdata=[...this.wednesdayData];
    let thdata=[...this.thrusdayData];
    let fdata=[...this.fridayData];
    let sdata=[...this.saturdayData];
    let sundata=[...this.sundayData];

    
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
    for(let x=0;x<=4-sundata.length;x++)
    {
        this.sundayData.push({})
    }
  }
}
