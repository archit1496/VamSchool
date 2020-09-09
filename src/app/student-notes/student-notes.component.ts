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

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.fetchNotes();
  }

  getTwilioToken(){
    this.studentService.getTwilioToken().subscribe(res => {
      this.twilioToken = res;
      console.log("Token = "+this.twilioToken)
    })
  }


  fetchNotes(){
    this.isLoading = true;
    this.studentService.fetchNotes().subscribe(res => {
      this.isLoading = false;
      this.notesList = res;
    })
    this.getTwilioToken();
  }

  readNotes(notes){
    window.open(notes, "_new");
  }

}
