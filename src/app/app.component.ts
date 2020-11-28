import { Component } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vamschool';

  constructor(public authService:AuthService,public router:Router){
    this.checkLogin();
  }
  checkLogin() {
    if (StorageService.getItem('token')) {
      if(StorageService.getItem('role')==='STUDENT')
          this.router.navigate(['wrapper/studashboard']);
      else if(StorageService.getItem('role')==='TEACHER')
         this.router.navigate(['wrapper/teacherNav/teacherdashboard']);
      else if(StorageService.getItem('role')==='OWNER')
         this.router.navigate(['wrapper/admin']);
      
    }
    else{
       this.router.navigate(['/home'])
    }
  }
}
