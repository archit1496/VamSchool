import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ZoomMtg } from '@zoomus/websdk';
import { TeacherService } from 'src/service/teacher.service';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  signatureEndpoint = 'https://api.onwardlearn.in/live/signature';
  apiKey = 'oy0BFe2gSXadvEYjBmkYfw'
  // meetingNumber: number;
  role = '1'
  leaveUrl = 'https://vamschool.in/wrapper/teacherdashboard'
  userName = 'Daily Standup Meeting'
  userEmail = 'test@gmail.com'
  // passWord = 'QkllV1NieEkyQlpKMmxtbjVHNWdIdz09'
  signature: any;
  teacherCourseData: any;
  todaysTimeTable: any;
  hideArrow = true;

  constructor(private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.fetchTeacherCourse();
    this.fetchTodaysTimeTable();
  }

  getSignature(meetingNumber,meetingPassword) {
    // meetingNumber = 73519189461
    alert(meetingNumber);
    alert(meetingPassword);
    console.log(meetingNumber, 'meetingNumber');
    
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: meetingNumber,
      apiKey: this.apiKey,
      apiSecret: 'j7AzrE6bowVSbM14ck24AqopRK1OPoTGneFE',
      role: '1',
      success: (res) => {
        console.log(res.result);
        this.startMeeting(res.result, meetingNumber, meetingPassword)
      }
    });
  }

  startMeeting(signature, meetingNumber, meetingPassword){
    console.log("Signature = "+signature)
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: meetingPassword,
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

  fetchTeacherCourse(){
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      console.log(res, '1');
      
      this.teacherCourseData = res.data;
    })
    // this.fetchTodaysTimeTable();
  }

  fetchTodaysTimeTable(){
    this.teacherService.fetchTimetableToday().subscribe(res => {
      console.log(res, '2');

      this.todaysTimeTable = res;
    })
  }

}
