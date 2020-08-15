import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminDetails: any;

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.fetchAdminDetails().subscribe(res => {
      this.adminDetails = res;
      //console.log("Data = "+JSON.stringify(this.adminDetails))
    })
  }

  timeTable(){
    this.router.navigate(['/wrapper/teachertimetable']);
  }

}
