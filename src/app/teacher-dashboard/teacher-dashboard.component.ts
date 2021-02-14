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
  // leaveUrl = 'http://localhost:4002/wrapper/teacherdashboard'

  userName = '';
  userEmail = '';
  // passWord = 'QkllV1NieEkyQlpKMmxtbjVHNWdIdz09'
  signature: any;
  teacherCourseData: any;
  todaysTimeTable: any;
  selectedClassId;
  // teacherCourseId : any;
  meetingpassWord="1234"
  topicName = "test Topic1"
  agenda = "agenda1"
  hideJoin = true;
  isClass: boolean = false;
  
  constructor(public teacherService: TeacherService) {
  }

  ngOnInit() {
    this.fetchTeacher();

    // this.fetchTodaysTimeTable();
  }

  createMeeting(){
    if (this.selectedClassId) {
    var course_id = this.selectedClassId;
    this.teacherService.createZoomMeeting(this.topicName, this.agenda, course_id).subscribe(res => {
  
     if (res && res.status === false) {
       alert(res.detail);
     } else {
      this.hideJoin = false;
      this.userName = res.data.zoomUserName
      this.fetchTeacherCourseForHostUrl(res.data.meeting_id, res.data.meeting_password);

     }
    })
  } else {
    alert ('please select class');
  }
  }

  getStartTime(time) {
    return (time.substring(0,5) + " Hrs");
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

  selectedClass(id) {
    this.selectedClassId = id;
    this.teacherService.fetchClassDetails(id).subscribe(res => {
    this.todaysTimeTable = res.data;
    })
  }

  // eventZoom(){
  //   ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
  //     console.log(data);
  //   });
  
    
  //   ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
  //     console.log(data);
  //   });
  
  //   ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
  //     console.log(data);
  //   });
  
  //   ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
  //     // {status: 1(connecting), 2(connected), 3(disconnected), 4(reconnecting)}
  //     console.log(data);
  //   });
  // }

  startMeeting(signature, meetingNumber, meetingPassword){
    console.log("Signature = "+signature)
    document.getElementById('zmmtg-root').style.display = 'block';
    document.getElementById('teacher-dashboard-id').style.display = 'none';
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
            alert(error);
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  fetchTeacherMeetingDetails(userName, userEmail){
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      this.teacherCourseData = res.data;
  
      // this.userName = userName;
      // this.userEmail = userEmail;

      // this.teacherCourseId = JSON.stringify(res.data[0].id);
    })
  }

  fetchTeacher() {
    this.teacherService.fetchTeacher().subscribe(res => {

      this.fetchTeacherMeetingDetails(res.email, res.first_name);
    })
  }

  fetchTeacherCourseForHostUrl(meeting_id, meeting_password){
    // this.teacherService.fetchSelectedTeacherCourse(course_id).subscribe(res => {
    //   let data = res.data;

      this.getSignature(meeting_id,meeting_password)
    // })
    
  }

  // getNextClass(todaysTimeTable) {
  //   var d = new Date();
  //   var current_time = d.getHours()*60*60+d.getMinutes()*60+d.getSeconds();
  //   // last class end time > current time => No more classes 
   
  //   var temp_start_time = [];
  //   var temp_end_time = [];
  //   console.log("length", Object.keys(todaysTimeTable).length);
  //   for(var i=0; i<Object.keys(todaysTimeTable).length; i++) {
  //     temp_start_time.unshift(current_time - ((60*60*(parseInt(todaysTimeTable[i].start_time.substr(0,2))))+
  //     (60*(parseInt(todaysTimeTable[i].start_time.substr(3,2))))+
  //     (parseInt(todaysTimeTable[i].start_time.substr(6,2)))));
      
  //     temp_end_time.unshift(current_time - ((60*60*(parseInt(todaysTimeTable[i].end_time.substr(0,2))))+
  //     (60*(parseInt(todaysTimeTable[i].end_time.substr(3,2))))+
  //     (parseInt(todaysTimeTable[i].end_time.substr(6,2)))));
  //   }
  //   if (current_time - Math.max(...temp_end_time) < 0) {
  //     temp_start_time = temp_start_time.filter(function(x){ return x > -1 });
    
  //     var h = Math.floor(temp_start_time[0] / 3600);
  //     var m = Math.floor(temp_start_time[0] % 3600 / 60);
  //     var s = Math.floor(temp_start_time[0] % 3600 % 60);
  
  //     var hDisplay = h > 0 ? h+":" : "00:";
  //     var mDisplay = m > 0 ? m+":" : "00:";
  //     var sDisplay = s > 0 ? s+"" : "00";
  //     this.isClass = true;
  //     return(hDisplay + mDisplay + sDisplay); 
  //   } else {
  //     this.isClass = false;
  //     return "No More Classes Today";
  //   }
  // }

  // fetchTodaysTimeTable(){
  //   this.teacherService.fetchTimetableToday().subscribe(res => {
  //     console.log(res, '2');
  //     this.todaysTimeTable = res;
  //   })
  // }

}
