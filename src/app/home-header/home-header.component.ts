import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('stickyMenu',null) menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', [])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }

    public scrollToForm(elementId: string): void {
      this.viewportScroller.scrollToAnchor(elementId);
    }

    showMenu() {
      console.log("hi");
      var x = document.getElementById("navbarSupportedContent");
      if (x.className === "navbar-collapse collapse show") {
        x.className = "navbar-collapse collapse";
      } 
      else if (x.className === "navbar-collapse sticky collapse show") {
        x.className = "navbar-collapse sticky collapse";
      }
      else {
        x.className = "collapse navbar-collapse show";
      }
    }
}
