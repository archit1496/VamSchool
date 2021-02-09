import { TeacherService } from 'src/service/teacher.service';
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


  signatureEndpoint = 'https://api.onwardlearn.in/live/signature';
  apiKey = 'pgl-ugf3QLubAI30B5EBag';
  // meetingNumber: string = '84675760804';
  role: string = '1';
  leaveUrl = 'https://vamschool.in/wrapper/studashboard';
  userName = '';
  userEmail = '';
  // passWord = 'WHliSWRZUkFiV3lJOE5KNUVWYTNZdz09'
  signature: any;
  isLoading:boolean;
  studentDataList;
  todayClassData;

  dashboardActivityData;

  hideJoinBtn = true;
  disableJoinBtn = true;
  constructor(private router: Router,public studentService:StudentService,  public teacherService: TeacherService) {
    this.fetchStudentDetails();
    this.fetchDashboardActivityData();
    console.log("width",screen.width)
  }


  ngOnInit() {


    // $('carousel');

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
      this.userName = res.first_name;
      this.userEmail = res.email;

      StorageService.setItem('class_id',this.studentDataList.student_class.id);
      if (this.studentDataList.courses.length) {
        StorageService.setItem('subjectName',
      
        this.studentDataList.courses.subject.subject_name);
      }
 
      StorageService.setItem('schoolName',this.studentDataList.school);
      // this.studentData=res;
      this.getTodayClassData();
    });
  }
  getTodayClassData(){
    this.studentService.fetchClassTodayData().subscribe(res => {
      this.todayClassData = res;
    });
  }


  getData(){
    if (Object.keys(this.studentDataList.courses).length) {
      this.studentService.fetchZoomIdPassword(this.studentDataList.courses.id).subscribe(res=>{
        this.hideJoinBtn = false
        this.getSignature(res.course.meeting_id, res.course.meeting_password)
      })
    } else {
      alert('class not start');
    }

  }

  getStartTime(time) {
    return (time.substring(0,5) + " Hrs");
  }
  
  getSignature(id, pass) {

    this.signature = ZoomMtg.generateSignature({
      meetingNumber: id,
      apiKey: this.apiKey,
      apiSecret: 'TeOVSOTTEyzK2RuQ2eFI7pctZet0YHiKJxxf',
      role: '0',
      success: (res) => {
        console.log(res.result);
        this.startMeeting(res.result, id, pass)
      }
    });
  }

  startMeeting(signature, meetingNumber, passWord){
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
          passWord: passWord,
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
