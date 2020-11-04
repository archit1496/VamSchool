import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @Output() classSelected = new EventEmitter<string>();
  classType:string="All";
  constructor() { }

  ngOnInit() {
  }

  class(){
    alert("worked")
  }
  onClassTypeClick(type:string){
    this.classType=type;
    this.classSelected.emit(this.classType);
}

}
