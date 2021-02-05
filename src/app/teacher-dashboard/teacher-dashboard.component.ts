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
  apiKey = 'pgl-ugf3QLubAI30B5EBag'
  // meetingNumber: "1234567892";
  role = '1'
  leaveUrl = 'https://vamschool.in/wrapper/teacherdashboard'
  userName = 'Daily Standup Meeting'
  userEmail = 'test@gmail.com'
  // passWord = 'QkllV1NieEkyQlpKMmxtbjVHNWdIdz09'
  signature: any;
  teacherCourseData: any;
  todaysTimeTable: any;
  hideArrow = true;
  teacherCourseId : any;
  meetingpassWord="1234"
  topicName = "test Topic1"
  agenda = "agenda1"
  hideJoin = true;
  constructor(private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.fetchTeacherCourse();
    this.fetchTodaysTimeTable();
  }

  createMeeting(){
    var course_id = this.teacherCourseId;
    this.teacherService.createZoomMeeting(this.topicName, this.agenda, course_id).subscribe(res => {
      this.hideJoin = false;
     if (res && res.status === false) {
       alert(res.detail);
     } else {
      this.fetchTeacherCourseForHostUrl(course_id);
     }

      
    })
  }

  getSignature(meetingNumber, meetingPassword) {
    // let meetingNumber = this.meetingNumber
    // meetingNumber = 73519189461

 
    // console.log(meetingNumber, 'meetingNumber');
    // let meetingPassword = this.meetingpassWord

    this.signature = ZoomMtg.generateSignature({
      meetingNumber: meetingNumber,
      
      apiKey: this.apiKey,
      apiSecret: 'TeOVSOTTEyzK2RuQ2eFI7pctZet0YHiKJxxf',
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
      this.teacherCourseData = res.data;
      console.log(res.data)
      console.log("teacher course :" + JSON.stringify(res.data[0].id))
      this.teacherCourseId = JSON.stringify(res.data[0].id);
    })
  }

  fetchTeacherCourseForHostUrl(course_id){
    this.teacherService.fetchSelectedTeacherCourse(course_id).subscribe(res => {
      let data = res.data;
      console.log("teacher Response = "+JSON.stringify(res.data))
      this.getSignature(data.meeting_id,data.meeting_password)
    })
    
  }



  fetchTodaysTimeTable(){
    this.teacherService.fetchTimetableToday().subscribe(res => {
      console.log(res, '2');

      this.todaysTimeTable = res;
    })
  }

}
