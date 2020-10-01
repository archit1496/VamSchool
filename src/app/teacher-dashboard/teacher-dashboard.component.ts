import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

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

  constructor(private router: Router) {
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
