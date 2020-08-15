import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input() studentData;
  userrole: string;

  constructor(public authService:AuthService) { }

  ngOnInit() {
    this.userrole = StorageService.getItem('role');
  }

  logout(){
    this.authService.logout().subscribe(res=>{
      if(res)
      {
        StorageService.clearAll();
        location.reload();
      }
    })
    
}

}
