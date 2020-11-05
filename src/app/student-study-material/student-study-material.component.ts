import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-study-material',
  templateUrl: './student-study-material.component.html',
  styleUrls: ['./student-study-material.component.css']
})
export class StudentStudyMaterialComponent implements OnInit {
  notesData;
  studentNotesDataSubjectWise;
  studentNotesDataTopicWise;
  isLoading:boolean;
  valueWithOutSubjectFilter;
  subjectFilter:boolean=false;
  notesActivity;
  constructor(public studentService:StudentService) { }

  ngOnInit() {
    this.fetchNotesDataSubject();
    this.fetchNotesActivity();
  }
  fetchNotesActivity() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchNotesActivity().subscribe(res => {
      this.isLoading = false;
      this.notesActivity = res;
      
    });
  }
  fetchNotesDataSubject() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchNotesQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataSubjectWise = res;
      this.valueWithOutSubjectFilter=[...this.studentNotesDataSubjectWise]
    });
  }
  fetchNotesDataTopicWise(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchNotesQuestionsTopic(id).subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataTopicWise = res;
      this.studentNotesDataSubjectWise=[];
    });
  }
  fetchNotesData(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchNotes(id).subscribe(res => {
      this.isLoading = false;
      this.notesData = res;
      this.studentNotesDataTopicWise=[];
      this.studentNotesDataSubjectWise=[];
    });
  }
  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  subjectSelected(event){
    this.subjectFilter=true;
    this.notesData = [];
      this.studentNotesDataTopicWise=[];
      this.studentNotesDataSubjectWise=[];
    if(event==='All')
    {
      this.studentNotesDataSubjectWise=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.valueWithOutSubjectFilter.filter(elm=>elm.name==event);
      this.studentNotesDataSubjectWise=filterValue;
      console.log("ddddd",this.studentNotesDataSubjectWise);

    }
  }
  onNotesClick(url){
    window.open(url);
  }
}
