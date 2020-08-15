import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/service/storage.service';

@Component({
  selector: 'app-sidebar-ss',
  templateUrl: './sidebar-ss.component.html',
  styleUrls: ['./sidebar-ss.component.css']
})
export class SidebarSsComponent implements OnInit {

  role: string;

  constructor() {
    this.role = StorageService.getItem('role');
   }

  ngOnInit() {
  }

}
