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
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'number':['',Validators.required]
    });
  }

  ngOnInit() {
  }
  onRegistration(){
    console.log("detail",this.registrationForm.value);
    if(this.registrationForm.valid)
    {
      this.authService.register(this.registrationForm.value).subscribe(res=>{
        if(res)
        {
          this.toaster.success("Registered Succefully!", "Success");
          this.router.navigate(['/login']);
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
