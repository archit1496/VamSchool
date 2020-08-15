import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/service/teacher.service';

@Component({
  selector: 'app-teacher-upload-video',
  templateUrl: './teacher-upload-video.component.html',
  styleUrls: ['./teacher-upload-video.component.css']
})
export class TeacherUploadVideoComponent implements OnInit {

  spinnerFlag = false;
  videoTopic: string;
  uploadedVideoResp;

  constructor(
    private toaster: ToastrService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
  }

  selectVideo(fileInput) {
    //this.spinnerFlag = false;
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('filename', files[0].name);
    formData.append('teacher', "4");
    formData.append('course', "4");
    formData.append('topic', this.videoTopic);
    this.teacherService.selectVideo(formData).subscribe(data => {
      this.spinnerFlag = true;
      this.uploadedVideoResp = data;
      this.uploadVideo(this.uploadedVideoResp, files)
      this.videoTopic = '';
      //this.toaster.success("Video uploaded succesfully!", "Success");
    },
    error => {
      this.toaster.error("Issue appending video", "Failed");
      this.videoTopic = '';
      this.spinnerFlag = false;
    });
  }

  uploadVideo(data, files){
    const formData: FormData = new FormData();
    //let xhr: XMLHttpRequest = new XMLHttpRequest();
    let credential = data.upload_data.fields['x-amz-credential'];
    let signature = data.upload_data.fields['x-amz-signature'];
    let amzDate = data.upload_data.fields['x-amz-date'];

    formData.append('key', data.upload_data.fields.key);
    formData.append('x-amz-algorithm','AWS4-HMAC-SHA256');
    formData.append('x-amz-credential', credential);
    formData.append('x-amz-date', amzDate);
    formData.append('policy', data.upload_data.fields.policy);
    formData.append('x-amz-signature', signature);
    formData.append('file',files[0], files[0].name);
    let url = data.upload_data.url;
    // xhr.open('POST',url,true);
    // xhr.send(formData);
    //this.spinnerFlag = false;
    this.teacherService.uploadVideo(formData, url).subscribe(res => {
      console.log("Resp = "+JSON.stringify(res))
      this.spinnerFlag = false;
      this.toaster.success("Video uploaded succesfully!", "Success");
    },
    error =>{
      this.spinnerFlag = false;
      this.toaster.error("Failed to upload video!", "Failed");
    });
  }

}
