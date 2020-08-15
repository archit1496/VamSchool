import { Component, OnInit } from '@angular/core';

import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private agoraService: AngularAgoraRtcService,
    private toaster: ToastrService
  ) { 
    this.agoraService.createClient();
  }

  ngOnInit() {
    this.showImage = true;
  }

  goLive(){
    this.showImage = false;
    this.showStopBtn = true;
    this.spinnerFlag = true;
    var channel_name = ((document.getElementById("channel_name") as HTMLInputElement).value);
    console.log(channel_name);
    this.agoraService.client.join(null, channel_name, null, (uid) => {
    this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
    this.localStream.setVideoProfile('720p_3');
    this.subscribeToStreams();
    });
  }

  private subscribeToStreams() {
    this.localStream.on("accessAllowed", () => {
      console.log("accessAllowed");
    });
    // The user has denied access to the camera and mic.
    this.localStream.on("accessDenied", () => {
      console.log("accessDenied");
    });

    this.localStream.init(() => {
      console.log("getUserMedia successfully");
      this.localStream.play('agora_local');
      this.agoraService.client.publish(this.localStream, function (err) {
        console.log("Publish local stream error: " + err);
      });
      this.agoraService.client.on('stream-published', function (evt) {
        console.log("Publish local stream successfully");
      });
      this.spinnerFlag = false;
    }, function (err) {
      console.log("getUserMedia failed", err);
    });

    this.agoraService.client.on('error', (err) => {
      console.log("Got error msg:", err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey("", () => {
          console.log("Renew channel key successfully");
        }, (err) => {
          console.log("Renew channel key failed: ", err);
        });
      }
    });

    this.agoraService.client.on('stream-added', (evt) => {
      const stream = evt.stream;
      this.agoraService.client.subscribe(stream, (err) => {
        console.log("Subscribe stream failed", err);
      });
    });

    this.agoraService.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) this.remoteCalls.push(`agora_remote${stream.getId()}`);
      setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
    });

    this.agoraService.client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    this.agoraService.client.on('peer-leave', (evt) => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
        console.log(`${evt.uid} left from this channel`);
      }
    }); 
  }

  stopLive() {
    this.agoraService.client.leave(function () {
      console.log("client leaves channel");
    }, function (err) {
      console.log("client leave failed ", err);
      this.toaster.error("Some error occurred while leaving. Please try again!", "Failed")
    });
    this.localStream.stop();
    this.localStream.close();
    this.showImage = true;
    this.showStopBtn = false;
  }

}
