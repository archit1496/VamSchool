import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() showHeader: Boolean;

  constructor(
    public router: Router, private viewportScroller: ViewportScroller
  ) { }

  ngOnInit() {
  }

  public scrollToForm(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
