import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { StorageService } from 'src/service/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  role:string;
  constructor(public authService:AuthService) { 
    this.role=StorageService.getItem('role');
  }

  ngOnInit() {

  }
  logout()
  {
   
    this.authService.logout().subscribe(res=>{
      if(res)
      {
        StorageService.clearAll();
        location.reload();
      }
    })
  }
}
