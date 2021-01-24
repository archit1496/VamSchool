import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-add-new-assignment',
  templateUrl: './add-new-assignment.component.html',
  styleUrls: ['./add-new-assignment.component.css']
})
export class AddNewAssignmentComponent implements OnInit {
  @Output() classSelected = new EventEmitter();

  topicName;
  topicQuestion;
  date;
  teacherCourseData = [];
  selectedCourse = '0';
  marks;
  files = [];
  constructor(public teacherService: TeacherService) { }

  ngOnInit() {
    this.fetchCourse();
  }
  uploadAssignment(fileInput) {
    this.files = fileInput.target.files;
  }

  fetchCourse() {
    this.teacherService.fetchTeacherCourse().subscribe(res => {
      this.teacherCourseData = res.data;
    });
  }

  save(){
this.classSelected.emit({'topic': this.topicName, 'topicQuestion': this.topicQuestion, 'date': this.date, 
'files': this.files, 'marks': this.marks, 'selectedCourse': this.selectedCourse, 'status':'save'});
  }

  discard(){
    this.classSelected.emit({ 'status':'close'});
  }
}
