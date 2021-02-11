import { BaseService } from 'src/service/base.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { AuthService } from 'src/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vamschool';

  constructor(public authService:AuthService,public router:Router, public _data: StorageService, 
    private cdr?: ChangeDetectorRef){
    this.checkLogin();
  }
  private subscriptions: Subscription[] = [];

  loading = false;

  async ngOnInit() {


    this.subscriptions.push(this._data.isLoading.subscribe((loadingStatus) => {
      // this.loading = loadingStatus;
      // if (loadingStatus != this.loading) { // check if it change, tell CD update view
      //   // this.show = show;
      // this.loading = loadingStatus;

      //   // this.cdr.detectChanges();
      // }

      setTimeout(() => this.loading = loadingStatus);
      // asyncFunctionCall().then(res => {
      //     this.loadingService.loading = false;
      // })
    }));
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
      if (!window.location.href.includes('forgot-password')) {
        this.router.navigate(['/home'])
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
