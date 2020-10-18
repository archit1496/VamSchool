import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-study-material',
  templateUrl: './student-study-material.component.html',
  styleUrls: ['./student-study-material.component.css']
})
export class StudentStudyMaterialComponent implements OnInit {
  notesData;
  isLoading:boolean;
  valueWithOutSubjectFilter;
  constructor(public studentService:StudentService) { }

  ngOnInit() {
    this.fetchNotes();
  }
  fetchNotes(){
    this.isLoading=true;
    this.studentService.fetchNotes().subscribe(res => {
      this.isLoading=false;
      this.notesData = res;
      this.valueWithOutSubjectFilter=[...this.notesData];
     
    })
  }
  subjectSelected(event){
    if(event==='All')
    {
      this.notesData=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.notesData.filter(elm=>elm.course.subject.subject_name=='event');
      this.notesData=filterValue;
      console.log("ddddd",this.notesData);

    }
  }
}
