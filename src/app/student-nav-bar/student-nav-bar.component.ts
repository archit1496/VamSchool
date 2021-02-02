import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
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
  initial:string;
 @Input('studentDataList') set studentDetails(value){
   this.studentDetail=value;
   this.firstName=StorageService.getItem('firstname');
   this.lastName=StorageService.getItem('lastname');
   this.schoolName=StorageService.getItem('schoolName');
   this.subjectName=StorageService.getItem('subjectName');
 }
  constructor(public authService:AuthService) { }

  ngOnInit() {
    this.initial=this.firstName.charAt(0)+this.lastName.charAt(0);
  }

  showMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }

    var y = document.getElementById('navbar');
    if (y.className === 'navbar navbar-expand-lg') {
      y.className += ' res-full';
    } else {
      y.className = 'navbar navbar-expand-lg';
    }

    var z = document.getElementById('nav-collapse');
    if (z.className === 'navbar-collapse justify-content-center') {
      z.className += ' res-full-top';
    } else {
      z.className = 'navbar-collapse justify-content-center';
    }
  }
  
  logout()
  {
   
    this.authService.logout().subscribe(res=>{
      if(res == null || res == '')
      {
        StorageService.clearAll();
        location.reload();
      }
    })
  }

}
