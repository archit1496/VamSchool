import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})
export class AdminboardComponent implements OnInit {
  data = [{name:'saurav', subject: 'physisc', class: '5, 6, 7'},
  {name:'saurav', subject: 'physisc', class: '5, 6, 7'}]
  constructor() { }

  ngOnInit() {
  }

}
