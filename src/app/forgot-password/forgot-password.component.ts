import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  changePasswordForm:FormGroup;
  showPwd: Boolean;

  constructor(public fb:FormBuilder,public authService:AuthService,public toaster:ToastrService,public router:Router) { 
    this.showPwd = false;
    this.changePasswordForm = this.fb.group({
      'email': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  showPassword(){
    this.showPwd = !this.showPwd;
  }
  onPasswordChangeSubmit(){
    console.log("detail",this.changePasswordForm.value);
    if(this.changePasswordForm.valid)
    {
      this.authService.forgotPassword(this.changePasswordForm.value).subscribe(res=>{
        if(res)
        {
          this.toaster.success("Succefully!", "Success");
          this.router.navigate(['/login']);
        }
      },error=>{
        this.toaster.error("Failed!", "Failed");
      })
    }
    else{
      this.toaster.error("Please Enter All Valid Details!", "Failed");
    }
  }

}
