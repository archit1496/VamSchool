import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ZoomMtg } from '@zoomus/websdk';
import { StudentService } from 'src/service/student.service';
import { StorageService } from 'src/service/storage.service';
import { EventEmitter } from 'events';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


@Component({
  selector: 'app-student-home-dashboard',
  templateUrl: './student-home-dashboard.component.html',
  styleUrls: ['./student-home-dashboard.component.css']
})

export class StudentHomeDashboardComponent implements OnInit {

  dummyData: { class: string; when: string; }[];
  signatureEndpoint = 'https://api.onwardlearn.in/live/signature';
  apiKey = 'oy0BFe2gSXadvEYjBmkYfw'
  meetingNumber = 4583021480
  role = 1
  leaveUrl = 'http://localhost:4200'
  userName = 'Daily Standup Meeting'
  userEmail = ''
  passWord = 'vamdeepak'
  signature: any;
  isLoading:boolean;
  studentDataList;
  todayClassData;
  studentData;
  dashboardActivityData;
  constructor(private router: Router,public studentService:StudentService) {
    this.fetchStudentDetails();
    this.fetchDashboardActivityData();
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
      },
      {
        "class": "X Std E",
        "when": "14:00"
      }
    ]
  }
  fetchDashboardActivityData(){
    this.studentService.fetchDashboardActivity().subscribe(res => {
      this.dashboardActivityData = res;
    });
  }
  fetchStudentDetails() {
    this.isLoading = true;
    this.studentService.fetchStudentDetails().subscribe(res => {
      this.isLoading = false;
      this.studentDataList = res;
      StorageService.setItem('class_id',this.studentDataList.student_class.id);
      StorageService.setItem('subjectName',this.studentDataList.courses[0].subject.subject_name);
      StorageService.setItem('schoolName',this.studentDataList.school);
      this.studentData=res;
      this.getTodayClassData();
    });
  }
  getTodayClassData(){
    this.studentService.fetchClassTodayData().subscribe(res => {
      this.todayClassData = res;
    });
  }
  getSignature() {
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: this.apiKey,
      apiSecret: 'j7AzrE6bowVSbM14ck24AqopRK1OPoTGneFE',
      role: 1,
      success: (res) => {
        console.log(res.result);
        this.startMeeting(res.result)
      }
    });
  }

  startMeeting(signature){
    console.log("Signature = "+signature)
   document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })

  }


}
