import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-student-class-subject',
  templateUrl: './student-class-subject.component.html',
  styleUrls: ['./student-class-subject.component.css']
})
export class StudentClassSubjectComponent implements OnInit {
  @Output() subjectSelected = new EventEmitter<string>();
  subjectType:string='All';
  constructor() { }

  ngOnInit() {
  }
  onSubjectTypeClick(type:string){
      this.subjectType=type;
      this.subjectSelected.emit(this.subjectType);
  }

}
