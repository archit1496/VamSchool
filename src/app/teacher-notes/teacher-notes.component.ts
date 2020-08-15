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

  constructor(
    private toaster: ToastrService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {

  }

  uploadNotes(fileInput) {
    this.spinnerFlag = true;
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('note', files[0], files[0].name);
    formData.append('teacher', "1");
    formData.append('course', "2");
    formData.append('topic', this.notesTopic);
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

}
