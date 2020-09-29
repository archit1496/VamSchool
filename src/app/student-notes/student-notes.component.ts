import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { StudentService } from 'src/service/student.service';

// import { Client } from 'twilio-chat';
// import { Channel } from 'twilio-chat/lib/channel';
// import { Message } from 'twilio-chat/lib/message';

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.css']
})
export class StudentNotesComponent implements OnInit {

  //Chat = require('twilio-chat');
  notesList = [];
  isLoading = false;
  twilioToken;
  accessToken: any;
  roomName: string;
  username: string;
  message: string;
  public chatMessage: string;

  //public chatClient: Client;

  @ViewChild('chatElement', null) chatElement: any;
  @ViewChild('chatDisplay', null) chatDisplay: any;

  public isConnected: boolean = false;
  public isConnecting: boolean = false;
  public isGettingChannels: boolean = false;
  private conSub: any;
  private disconSub: any;
  public channels: any[] = [];
  public channelObj: any;
  public typeObservable: any;
  //public currentChannel: Channel;
  //public messages: Message[] = [];
  public membersTyping: any = [];
  currentUsername: any;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.fetchNotes();
  }

  getTwilioToken() {
    this.studentService.getTwilioToken().subscribe(res => {
      this.twilioToken = res;
      console.log("Token = " + JSON.stringify(this.twilioToken))
      this.accessToken = this.twilioToken.token;
     // this.connect(this.accessToken);
    });
  }

  // connect(accessToken) {
  //  this.chatService.connect(accessToken)
  // }

  fetchNotes() {
    this.isLoading = true;
    this.studentService.fetchNotes().subscribe(res => {
      this.isLoading = false;
      this.notesList = res;
    })
    this.getTwilioToken();
  }

  readNotes(notes) {
    window.open(notes, "_new");
  }

}
