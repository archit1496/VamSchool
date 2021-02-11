import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @Output() classSelected = new EventEmitter<string>();
  classType:string="All";
  classesData = [];
  constructor(public teacherService: TeacherService) { }

  ngOnInit() {
    this.fetchClassesData();
  }


  onClassTypeClick(type:string){
    this.classType=type;
    this.classSelected.emit(this.classType);
}

fetchClassesData(){
  this.teacherService.fetchClasses().subscribe(res => {
    this.classesData = res.data;
  })
}

}
