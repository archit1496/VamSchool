import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  helpForm: FormGroup;

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.helpForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'message': ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(){
  }

}
