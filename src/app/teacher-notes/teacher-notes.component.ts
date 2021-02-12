import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
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
  // isLoading:boolean;
  notesVideos = false;
  teacherId;
  spinnerFlag;
  uploadedNotesResp;
  selectedNotesData;
  teacherCourseData = [];
  selectedCourse = '0';
  files;
  topic = '';
  selectedData;
  newtopic;
  url = '';
  notesOrVideo: string;
  filesValue;
  isDatainTopicWise: boolean = false;
  
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

  submitForm(data){
    // debugger;
    console.log(data);
  }

  postData(){
    console.log("Save clicked")
    const data: FormData = new FormData();
    data.append('name', this.topic);
    data.append('course', this.selectedData.id.toString());

    this.spinnerFlag = true;

    this.teacherService.postNotesData(data, this.selectedData.id).subscribe(data => {
      this.spinnerFlag = false;
      this.toaster.success("File uploaded succesfully!", "Success");
      this.fetchNotesDataTopicWise(this.selectedData.id);
    },
    error => {
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload file!", "Failed")
    });
  }

  fetchNotesDataSubject() {
    // this.isLoading = true;
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      // this.isLoading = false;
      this.studentNotesDataSubjectWise = res.data;
      this.isDatainTopicWise = true;
    });
  }

  fetchNotesDataTopicWise(id:number) {
    // this.isLoading = true;
    this.teacherService.fetchNoteData(id).subscribe(res => {
      // this.isLoading = false;
      this.studentNotesDataSubjectWise=[];
      this.studentNotesDataTopicWise = res;
      if(this.studentNotesDataTopicWise.length === 0 ) {
        this.isDatainTopicWise = false;
      } else {
        this.isDatainTopicWise = true;
      }
    });
  }

  fetchNotesData() {
    this.studentNotesDataTopicWise = [];
    this.notesVideos = true;
  }

  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }

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
    document.getElementById('myForm2').style.display = 'block';
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

  closeForm2() {
    document.getElementById('myForm2').style.display = 'none';
    const element = document.getElementById('mainOuterDiv');
    element.classList.remove('newclass');
  }

  uploadNotes(fileInput) {
    this.files = fileInput.target.files;
    this.filesValue = fileInput.target.value;
  }

  postNotesData(){
    this.spinnerFlag = true;
    const formData: FormData = new FormData();
    if (this.url === 'notes') {
      formData.append('note', this.files[0], this.files[0].name);
    } else {
      formData.append('video', this.files[0], this.files[0].name);
    }

    formData.append('name', this.newtopic);
    formData.append('dir', this.selectedNotesData.id);

    this.teacherService.updateNotes(this.selectedNotesData.id, formData, this.url).subscribe(data => {
      this.uploadedNotesResp = data;
      this.spinnerFlag = false;
      this.toaster.success("File uploaded succesfully!", "Success");
      this.fetchNotes(this.url === 'notes' ? 'note' : 'vid');
    },
    error => {
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload file!", "Failed")
    });
  }

  fetchNotes(type){
    if (type === 'note') {
      this.url = 'notes';
      this.notesOrVideo = 'Notes';

    } else if (type === 'vid') {
      this.url = 'videos';
      this.notesOrVideo = 'Videos'
    }

    this.teacherService.getTeacherNotes(this.selectedNotesData.id, this.url).subscribe(res => {
    this.notesVideos = false;
    this.notesData = res.notes_obj;
    }) 
  }

  // validation of input file size and extension
  Validate(folder_filetype) {
    if(this.filesValue!='') {
      var checkimg = this.filesValue.toLowerCase();
      if( folder_filetype == 'Notes') {
        if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.pdf)$/)) { 
          alert("File format not supported"); 
          return false;
        }
      }
      else if( folder_filetype == 'Videos') {
        if (!checkimg.match(/(\.mp4|\.flv|\.mkv)$/)) { 
          alert("File format not supported"); 
          return false;
        }
      }
    }

    if(this.files[0].size > 5120) {
        alert("File size too large");
        return false;
    }
    this.postNotesData();
    return true;
  }
}
