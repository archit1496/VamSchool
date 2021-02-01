import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-class-subject',
  templateUrl: './student-class-subject.component.html',
  styleUrls: ['./student-class-subject.component.css']
})
export class StudentClassSubjectComponent implements OnInit {
  @Output() subjectSelected = new EventEmitter<string>();
  subjectType:string='All';
  studentSubjects;
  constructor(public studentService:StudentService) {
    this.fetchStudentSubjectData();
   }

  ngOnInit() {
   
  }
  onSubjectTypeClick(type:string){
      this.subjectType=type;
      this.subjectSelected.emit(this.subjectType);
  }
  fetchStudentSubjectData(){
      this.studentService.fetchStudentSubject().subscribe(res => {
      this.studentSubjects = res;
    });
  }
}
