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

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes(){
    this.isLoading = true;
    this.studentService.fetchNotes().subscribe(res => {
      this.isLoading = false;
      this.notesList = res;
    })
  }

  readNotes(notes){
    window.open(notes, "_new");
  }

}
