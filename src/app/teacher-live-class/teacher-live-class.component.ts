import { Component, OnInit, Inject } from '@angular/core';

import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-teacher-live-class',
  templateUrl: './teacher-live-class.component.html',
  styleUrls: ['./teacher-live-class.component.css']
})
export class TeacherLiveClassComponent implements OnInit {

  channelName: string;
  localStream: Stream;
  remoteCalls: any = [];
  showImage: boolean = true;
  showStopBtn = false;
  spinnerFlag: boolean;
  signatureEndpoint = 'https://api.onwardlearn.in/live/signature'
  apiKey = 'oy0BFe2gSXadvEYjBmkYfw'
  meetingNumber = 4583021480
  role = 1
  leaveUrl = 'http://localhost:4201'
  userName = 'Daily Standup Meeting'
  userEmail = ''
  passWord = 'vamdeepak'
  signature: any;

  constructor(
    private toaster: ToastrService,
    public httpClient: HttpClient, 
    @Inject(DOCUMENT) document
  ) { 
  }

  ngOnInit() {
    this.getSignature();
  }

  goLive(){
    console.log("Signature = "+this.signature)
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: this.signature,
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

  getSignature() {
    //alert("Entered")
    this.signature = ZoomMtg.generateSignature({
		  meetingNumber: this.meetingNumber,
		  apiKey: this.apiKey,
		  apiSecret: 'j7AzrE6bowVSbM14ck24AqopRK1OPoTGneFE',
		  role: 1,
		  success: function(res){
		  console.log(res.result);
		  }
		  });
  }
  
}
