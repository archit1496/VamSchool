import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  @Input('fromHome') fromHome: boolean;

  constructor() { }

  ngOnInit() {
  }

}
