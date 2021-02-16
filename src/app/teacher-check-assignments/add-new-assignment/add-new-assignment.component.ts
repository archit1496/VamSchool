import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-add-new-assignment',
  templateUrl: './add-new-assignment.component.html',
  styleUrls: ['./add-new-assignment.component.css']
})
export class AddNewAssignmentComponent implements OnInit {
  @Output() classSelected = new EventEmitter();
  @Input() status;

  topicName;
  topicQuestion;
  date;
  teacherCourseData = [];
  selectedCourse = '0';
  marks;
  files = [];
  filesValue;
  newTopicName = '';
  constructor(public teacherService: TeacherService) { }

  ngOnInit() {
    this.fetchCourse();
  }
  uploadAssignment(fileInput) {
    this.files = fileInput.target.files;
    this.filesValue = fileInput.target.value;
  }

  fetchCourse() {
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      this.teacherCourseData = res.data;
    });
  }

  save(type){
    if (type === 'all') {
      this.classSelected.emit({'topic': this.topicName, 'topicQuestion': this.topicQuestion, 'date': this.date, 
'files': this.files, 'marks': this.marks, 'selectedCourse': this.selectedCourse, type: 'all'});
    } else if(type === 'topic') {
      this.classSelected.emit({'topic': this.newTopicName, 'type': 'topic'});
    }

  }

  discard(type){
    if (type === 'all') {
      this.classSelected.emit({ 'status':'closeall'});
      } else if(type === 'topic') {
      this.classSelected.emit({ 'status':'closetopic'});
    }

  }

  Validate() {
    if(this.filesValue!='') {
      var checkimg = this.filesValue.toLowerCase();
        if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.pdf|\.mp4|\.flv|\.mkv)$/)) { 
          alert("File format not supported"); 
          return false;
      }
    }

    if(this.files[0].size > 20971520) {  //20 MB
        alert("Please Upload Files less than 20MB");
        return false;
    }
    this.save('all');
    return true;
  }
}
