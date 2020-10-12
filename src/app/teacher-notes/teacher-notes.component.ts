import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teacher-notes',
  templateUrl: './teacher-notes.component.html',
  styleUrls: ['./teacher-notes.component.css']
})
export class TeacherNotesComponent implements OnInit {

  topicName: string;
  uploadedNotesResp = [];
  notesTopic: string;
  spinnerFlag = false;
  dummyData: any;
  isTiles: boolean;
  notesData: any;
  teacherId: any;
  courseId;

  constructor(
    private toaster: ToastrService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.fetchTeacher();
    this.isTiles = true;
  }

  fetchTeacher() {
    this.teacherService.fetchTeacher().subscribe(res => {
      this.teacherId = res.id;
      this.fetchNotes();
    })
  }

  uploadNotes(fileInput) {
    this.spinnerFlag = true;
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('note', files[0], files[0].name);
    formData.append('teacher', this.teacherId);
    formData.append('course', "5");
    formData.append('topic', files[0].name);
    this.teacherService.uploadNotes(formData).subscribe(data => {
      this.uploadedNotesResp = data;
      this.notesTopic = '';
      this.spinnerFlag = false;
      this.toaster.success("File uploaded succesfully!", "Success");
    },
    error => {
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload file!", "Failed")
    });
  }

  tiles(){
    this.isTiles = true;
  }

  list(){
    this.isTiles = false;
  }

  fetchNotes(){
    this.teacherService.fetchNotes().subscribe(res => {
      this.notesData = res;
      // console.log("Notes data = "+JSON.stringify(this.notesData))
      // this.courseId = this.notesData.course;
      // alert(JSON.stringify(this.courseId))
    })
  }

}
