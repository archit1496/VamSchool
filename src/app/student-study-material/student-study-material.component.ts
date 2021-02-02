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
  studentNotesVideos = false;
  url = '';
  selectedStudentNotesData;
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
  // fetchNotesDataSubject() {
  //   this.subjectFilter=false;
  //   this.isLoading = true;
  //   this.studentService.fetchNotesQuestionsSubject().subscribe(res => {
  //     this.isLoading = false;
  //     this.studentNotesDataSubjectWise = res;
  //     this.valueWithOutSubjectFilter=[...this.studentNotesDataSubjectWise]
  //   });
  // }

  fetchNotesDataSubject() {
    this.isLoading = true;
    this.studentService.fetchStudentSubject().subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataSubjectWise = res;
    });
  }

  fetchNotesDataTopicWise(id:number) {
    // this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchNotesQuestionsTopic2(id).subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataTopicWise = res;
      this.studentNotesDataSubjectWise=[];
    });
  }

  openNotesData () {
    this.studentNotesVideos = true;
    this.studentNotesDataTopicWise = [];
  }
  fetchNotesData(type) {
    // this.subjectFilter=false;
    // this.isLoading = true;
    // this.studentService.fetchNotes(id).subscribe(res => {
    //   this.isLoading = false;
    //   this.notesData = res;
    //   this.studentNotesDataTopicWise=[];
    //   this.studentNotesDataSubjectWise=[];
    // });
    if (type === 'note') {
      this.url = 'notes';
    } else if (type === 'vid') {
      this.url = 'videos';

    }
    this.studentService.fetchNotes2(this.selectedStudentNotesData.id, this.url).subscribe(res => {
      this.studentNotesVideos = false;
      this.notesData = res[this.url];

    })
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
  onDownloadClick(url){
    window.open(url);
  }

  getFileType(url:string){
    if(url)
    return url.split(".")[url.split(".").length-1];
  }
}
