import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-videos',
  templateUrl: './student-videos.component.html',
  styleUrls: ['./student-videos.component.css']
})
export class StudentVideosComponent implements OnInit {

  uploadedVideos = [];
  isLoading = false;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.fetchVideos();
  }

  fetchVideos(){
    this.isLoading = true;
    this.studentService.fetchVideos().subscribe(res => {
      this.isLoading = false;
      this.uploadedVideos = res;
    })
  }

  watchVideo(video){
    window.open(video, "_new");
  }

}
