import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup
  constructor(public fb:FormBuilder,public authService:AuthService,public router: Router,public toaster:ToastrService) { 
    this.registrationForm = this.fb.group({
      'email': ['', Validators.required],
      //'password':['',Validators.required],
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'role':['',Validators.required],
    });
  }

  ngOnInit() {
  }

  onRegistration(){
    console.log("detail",this.registrationForm.value);
    const formData: FormData = new FormData();
    formData.append('first_name', this.registrationForm.value.first_name);
    formData.append('last_name', this.registrationForm.value.last_name);
    formData.append('email', this.registrationForm.value.email);
    //formData.append('password', this.registrationForm.value.password);
    formData.append('role', this.registrationForm.value.role);
    console.log("Form Data = "+formData)
    if(this.registrationForm.valid)
    {
      this.authService.register(formData).subscribe(res=>{
        if(res.status)
        {
          this.toaster.success("User Account Succefully!", "Success");
          this.toaster.warning("Email has been sent to"+this.registrationForm.value.email+". Please check your email to proceed further")
          this.router.navigate(['/login']);
        } else{
          this.toaster.error(res.detail, "Error");
        }
      },error=>{
        this.toaster.error("Failed to Register!", "Failed");
      })
    }
    else{
      this.toaster.error("Please Enter All Valid Details!", "Failed");
    }
  }
}
