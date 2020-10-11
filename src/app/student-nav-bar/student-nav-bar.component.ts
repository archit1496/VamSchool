import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
@Component({
  selector: 'app-student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.css']
})
export class StudentNavBarComponent implements OnInit {
  studentDetail;
  firstName=StorageService.getItem('firstname');
  lastName=StorageService.getItem('lastname');
  schoolName=StorageService.getItem('schoolName');
  subjectName=StorageService.getItem('subjectName');
  
 @Input('studentDataList') set studentDetails(value){
   this.studentDetail=value;
   this.firstName=StorageService.getItem('firstname');
   this.lastName=StorageService.getItem('lastname');
   this.schoolName=StorageService.getItem('schoolName');
   this.subjectName=StorageService.getItem('subjectName');
 }
  constructor() { }

  ngOnInit() {
  }
 

}
