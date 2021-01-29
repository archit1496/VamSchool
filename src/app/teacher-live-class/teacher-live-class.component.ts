import { Component, OnInit, Inject } from '@angular/core';

import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { TeacherService } from 'src/service/teacher.service';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-teacher-live-class',
  templateUrl: './teacher-live-class.component.html',
  styleUrls: ['./teacher-live-class.component.css']
})
export class TeacherLiveClassComponent implements OnInit {

  topicName: any;
  channelName: string;
  localStream: Stream;
  remoteCalls: any = [];
  showImage: boolean = true;
  showStopBtn = false;
  spinnerFlag: boolean;
  signatureEndpoint = 'https://api.onwardlearn.in/live/signature'
  apiKey = 'oy0BFe2gSXadvEYjBmkYfw'
  meetingNumber = '4583021480'
  role = '1'
  leaveUrl = 'http://localhost:4200'
  userName = 'Daily Standup Meeting'
  userEmail = ''
  passWord = 'vamdeepak'
  signature: any;
  joinURL: any;

  constructor(
    private teacherService: TeacherService,
    private toaster: ToastrService
  ) { 
  }

  ngOnInit() {
  }

  getSignature() {
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: this.apiKey,
      apiSecret: 'j7AzrE6bowVSbM14ck24AqopRK1OPoTGneFE',
      role: '1',
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


  getMeetingDetails(){
    this.teacherService.getMeetingDetails().subscribe(res => {
      console.log("Meeting = "+JSON.stringify(res))
      this.joinURL =  res.join_url;
    })
  }

  createMeeting(){
    this.teacherService.createZoomMeeting(this.topicName, this.topicName, 4).subscribe(res => {
      console.log("Response = "+JSON.stringify(res))
    })
    this.getMeetingDetails();
  }

  
}
