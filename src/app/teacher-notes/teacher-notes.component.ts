import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/service/student.service';
import { TeacherService } from 'src/service/teacher.service';
// todo-  no internet connection check
// todo- field validations
@Component({
  selector: 'app-teacher-notes',
  templateUrl: './teacher-notes.component.html',
  styleUrls: ['./teacher-notes.component.css']
})
export class TeacherNotesComponent implements OnInit {
  notesData;
  studentNotesDataSubjectWise = [];
  studentNotesDataTopicWise;
  isLoading:boolean;
  // valueWithOutSubjectFilter;
  subjectFilter:boolean=false;
  teacherId;
  spinnerFlag;
  uploadedNotesResp;
  selectedNotesData;
  teacherCourseData = [];
  selectedCourse = '0';
  files;
  topic = '';
  selectedData;
  constructor(public teacherService:TeacherService,private toaster: ToastrService) { }
  get Math() {
    return Math;
  }
    get Infinity() {
    return Infinity;
  }
  ngOnInit() {
    this.fetchNotesDataSubject();
    this.fetchTeacher();
  }

  postData(){
  const obj = {
      "teacher": this.selectedData.teacher,
      "name": this.topic,
  "dir_type": 2,
      "parent": this.selectedData.id
}

    this.spinnerFlag = true;

    this.teacherService.updateTeacherNotesTopic(obj).subscribe(data => {
      // this.uploadedNotesResp = data;
      this.spinnerFlag = false;
      this.toaster.success("File uploaded succesfully!", "Success");
    },
    error => {
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload file!", "Failed")
    });
  }

  fetchNotesDataSubject() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotesQuestionsSubject().subscribe(res => {
      console.log(res, 'studentNotesDataSubjectWise');
      
      this.isLoading = false;
      this.studentNotesDataSubjectWise = res;
      // this.valueWithOutSubjectFilter=[...this.studentNotesDataSubjectWise]
    });
  }
  fetchNotesDataTopicWise(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotesQuestionsTopic(id).subscribe(res => {
      console.log(res, 'studentNotesDataTopicWise');
      
      this.isLoading = false;
      // this.studentNotesDataTopicWise = res.directory_list;
      this.studentNotesDataSubjectWise=[];
    });
  }
  fetchNotesData(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchNotes(id).subscribe(res => {
      console.log(res, 'notesData');
      
      this.isLoading = false;
      this.notesData = res;
      this.studentNotesDataTopicWise=[];
      this.studentNotesDataSubjectWise=[];
    });
  }
  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  // classSelected(event){
  //   this.subjectFilter=true;
  //   this.notesData = [];
  //     this.studentNotesDataTopicWise=[];
  //     this.studentNotesDataSubjectWise=[];
  //   if(event==='All')
  //   {
  //     this.studentNotesDataSubjectWise=[...this.valueWithOutSubjectFilter];
  //   }
  //   else{
  //     let filterValue=this.valueWithOutSubjectFilter.filter(elm=>elm.course.subject.subject_name==event);
  //     this.studentNotesDataSubjectWise=filterValue;

  //   }
  // }
  onNotesClick(url){
    window.open(url);
  }
  fetchTeacher() {
    this.teacherService.fetchTeacher().subscribe(res => {
      this.teacherId = res.id;
    
    })
  }

  openForm() {
    this.fetchCourse();
    document.getElementById('myForm').style.display = 'block';
    this.selectedCourse = '0';
    // this.topicQuestion = '';
    this.files = null;
    //  (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = "";
    const someElement = document.getElementById('mainOuterDiv');
    someElement.className += ' newclass';

  }

  openForm2() {
this.topic = '';
    document.getElementById('myForm').style.display = 'block';
    // this.topicName = '';
    // this.topicQuestion = '';
    // this.files = null;
    //  (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = "";
    const someElement = document.getElementById('mainOuterDiv');
    someElement.className += ' newclass';

  }

  fetchCourse() {
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      this.teacherCourseData = res.data;
    });
  }


  closeForm() {

    document.getElementById('myForm').style.display = 'none';
    const element = document.getElementById('mainOuterDiv');
    element.classList.remove('newclass');

  }

  uploadNotes(fileInput) {
    this.files = fileInput.target.files;
    // this.spinnerFlag = true;
    // const formData: FormData = new FormData();
    // const files: File = fileInput.target.files;
    // formData.append('note', files[0], files[0].name);
    // formData.append('teacher', this.teacherId);
    // formData.append('course', "5");
    // formData.append('topic', files[0].name);
    // this.teacherService.uploadNotes(formData).subscribe(data => {
    //   this.uploadedNotesResp = data;
    //   this.spinnerFlag = false;
    //   this.toaster.success("File uploaded succesfully!", "Success");
    // },
    // error => {
    //   this.spinnerFlag = false;
    //   this.toaster.error("Failed to upload file!", "Failed")
    // });

  }

  postNotesData(){

    this.spinnerFlag = true;
    const formData: FormData = new FormData();

    formData.append('note', this.files[0], this.files[0].name);
    formData.append('teacher', this.selectedNotesData.teacher);
    formData.append('course', this.selectedCourse);
    formData.append('topic', this.selectedNotesData.name);
    formData.append('dir', this.selectedNotesData.id);

    this.teacherService.updateNotes(this.selectedNotesData.id, formData).subscribe(data => {
      this.uploadedNotesResp = data;
      this.spinnerFlag = false;
      this.toaster.success("File uploaded succesfully!", "Success");
    },
    error => {
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload file!", "Failed")
    });
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
