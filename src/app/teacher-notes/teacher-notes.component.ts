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

  constructor(
    private toaster: ToastrService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.fetchNotes();
    this.dummyData = [
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Chemistry'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Math'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Math'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Physics'
      },
      {
        'lastUpdated': 'Wed',
        'numOfFiles': '10',
        'subject': 'Math'
      }
    ];
    this.isTiles = true;
  }

  uploadNotes(fileInput) {
    this.spinnerFlag = true;
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('note', files[0], files[0].name);
    formData.append('teacher', "2");
    formData.append('course', "3");
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
      console.log("res notes = "+JSON.stringify(res))
      this.notesData = res;
    })
  }

}
