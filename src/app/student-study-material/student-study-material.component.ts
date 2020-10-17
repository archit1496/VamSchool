import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-study-material',
  templateUrl: './student-study-material.component.html',
  styleUrls: ['./student-study-material.component.css']
})
export class StudentStudyMaterialComponent implements OnInit {
  notesData;
  constructor(public studentService:StudentService) { }

  ngOnInit() {
    this.fetchNotes();
  }
  fetchNotes(){
    this.studentService.fetchNotes().subscribe(res => {
      this.notesData = res;
      // console.log("Notes data = "+JSON.stringify(this.notesData))
      // this.courseId = this.notesData.course;
      // alert(JSON.stringify(this.courseId))
    })
  }
}
