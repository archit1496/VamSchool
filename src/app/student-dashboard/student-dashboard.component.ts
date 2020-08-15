import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/service/storage.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  role;
  
  constructor() { 
    this.role=StorageService.getItem('role');
  }

  ngOnInit() {
  }

}
