import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isLoading: boolean = false;
  loginError: any;

  constructor(private fb:FormBuilder,public authService:AuthService,public router: Router,
    private toasterMsg: ToastrService) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
   }

  ngOnInit() {
    this.loginError = '';
  }
  
  loginUser() {
    //this.router.navigate(['wrapper/student-main-page']);
      this.isLoading = true;
      this.loginError = '';
      this.loginForm.get('password').markAsTouched();
      this.loginForm.get('email').markAsTouched();
      this.authService.authenticate(this.loginForm.value).subscribe(data => {
        this.isLoading = false;
        StorageService.setItem('token',data.token);
        StorageService.setItem('role',data.user.role);
        StorageService.setItem('firstname',data.user.first_name);
        StorageService.setItem('lastname',data.user.last_name);
        StorageService.setItem('isEmailVerified', data.is_email_active);
        console.log("ROLE = "+JSON.stringify(data.user.role));
        if(!data.is_email_active){
          this.toasterMsg.error("Please verify you email");
        }
        if(data.user.role==='TEACHER')
        {
          this.router.navigate(['wrapper/teacherNav']);
        } else if(data.user.role==='STUDENT'){
          StorageService.setItem('student_id',data.user.id);
          this.router.navigate(['wrapper/studashboard']);
        }
        else if(data.user.role==='SUPER_ADMIN'){
      //  alert(JSON.stringify(data));
        // alert(data["email"]);
        //alert(data.user);
        //alert(data.token);
        StorageService.setItem('role',data.user.role);
        if(data.user.role==='r')
        {
          this.router.navigate(['wrapper/teacher-main-page']);
        } else if(data.user.role==='STUDENT'){
          this.router.navigate(['wrapper/student-main-page']);
        }
        else if(data.user.role==='SUPER_ADMIN'){
          this.router.navigate(['wrapper/admin']);
        }
        }error => {
          this.isLoading = false;
          this.loginError = error.error['detail'];
          // this.isBusy = false;
          // this.alertService.showError({title: 'Login Failure', message: 'User not found'});
        }
      });
  }

  onForgotPasswordClick(){
    this.router.navigate(['/forgot-password']);
  }

}
