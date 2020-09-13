import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.css']
})
export class StudentNotesComponent implements OnInit {

  notesList = [];
  isLoading = false;
  twilioToken;
  accessToken: any;
  roomName: string;
  username: string;
  message: string;

  constructor(
    private studentService: StudentService) { }

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
  //   let Chat = require('twilio-chat');
  //   Chat.Client.create(accessToken).then(client => {
  //       // Use client
  //   });
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
