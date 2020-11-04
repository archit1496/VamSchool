import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/service/student.service';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teacher-notes',
  templateUrl: './teacher-notes.component.html',
  styleUrls: ['./teacher-notes.component.css']
})
export class TeacherNotesComponent implements OnInit {
  notesData;
  studentNotesDataSubjectWise;
  studentNotesDataTopicWise;
  isLoading:boolean;
  valueWithOutSubjectFilter;
  subjectFilter:boolean=false;
  constructor(public studentService:StudentService,public teacherService:TeacherService) { }

  ngOnInit() {
    this.fetchNotesDataSubject();
  }
  // fetchNotes(){
  //   this.isLoading=true;
  //   this.studentService.fetchNotes().subscribe(res => {
  //     this.isLoading=false;
  //     this.notesData = res;
  //     this.valueWithOutSubjectFilter=[...this.notesData];
     
  //   })
  // }
  fetchNotesDataSubject() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotesQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataSubjectWise = res;
      this.valueWithOutSubjectFilter=[...this.studentNotesDataSubjectWise]
    });
  }
  fetchNotesDataTopicWise(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotesQuestionsTopic(id).subscribe(res => {
      this.isLoading = false;
      this.studentNotesDataTopicWise = res;
      this.studentNotesDataSubjectWise=[];
    });
  }
  fetchNotesData(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotes(id).subscribe(res => {
      this.isLoading = false;
      this.notesData = res;
      this.studentNotesDataTopicWise=[];
      this.studentNotesDataSubjectWise=[];
    });
  }
  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  classSelected(event){
    this.subjectFilter=true;
    this.notesData = [];
      this.studentNotesDataTopicWise=[];
      this.studentNotesDataSubjectWise=[];
    if(event==='All')
    {
      this.studentNotesDataSubjectWise=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.valueWithOutSubjectFilter.filter(elm=>elm.course.subject.subject_name==event);
      this.studentNotesDataSubjectWise=filterValue;
      console.log("ddddd",this.studentNotesDataSubjectWise);

    }
  }
  onNotesClick(url){
    window.open(url);
  }

  // topicName: string;
  // uploadedNotesResp = [];
  // notesTopic: string;
  // spinnerFlag = false;
  // dummyData: any;
  // isTiles: boolean;
  // notesData: any;
  // teacherId: any;
  // courseId;

  // constructor(
  //   private toaster: ToastrService,
  //   private teacherService: TeacherService
  // ) { }

  // ngOnInit() {
  //   this.fetchTeacher();
  //   this.isTiles = true;
  // }

  // fetchTeacher() {
  //   this.teacherService.fetchTeacher().subscribe(res => {
  //     this.teacherId = res.id;
  //     this.fetchNotes();
  //   })
  // }

  // uploadNotes(fileInput) {
  //   this.spinnerFlag = true;
  //   const formData: FormData = new FormData();
  //   const files: File = fileInput.target.files;
  //   formData.append('note', files[0], files[0].name);
  //   formData.append('teacher', this.teacherId);
  //   formData.append('course', "5");
  //   formData.append('topic', files[0].name);
  //   this.teacherService.uploadNotes(formData).subscribe(data => {
  //     this.uploadedNotesResp = data;
  //     this.notesTopic = '';
  //     this.spinnerFlag = false;
  //     this.toaster.success("File uploaded succesfully!", "Success");
  //   },
  //   error => {
  //     this.spinnerFlag = false;
  //     this.toaster.error("Failed to upload file!", "Failed")
  //   });
  // }

  // tiles(){
  //   this.isTiles = true;
  // }

  // list(){
  //   this.isTiles = false;
  // }

  // fetchNotes(){
  //   this.teacherService.fetchNotes().subscribe(res => {
  //     this.notesData = res;
     
  //   })
  // }

}
