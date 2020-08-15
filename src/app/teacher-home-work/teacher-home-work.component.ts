import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/service/teacher.service';
import { Observable, Subject } from 'rxjs';
import { AppUrl } from 'src/constant/app-url';
import { StorageService } from 'src/service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-home-work',
  templateUrl: './teacher-home-work.component.html',
  styleUrls: ['./teacher-home-work.component.css']
})
export class TeacherHomeWorkComponent implements OnInit {

  assignmentTopic = '';
  progressLoading = new Subject<any>();
  constructor(
    private router: Router, private teacher: TeacherService,   private toastr: ToastrService
  ) {
   }

  ngOnInit() {
  }

  checkAssignment() {
    this.router.navigate(['/wrapper/teacherdashboard/teachercheckassignments']);
  }

  handleFileInput(files: FileList) {
    if (this.assignmentTopic === '') {
      alert('please add assignment topic');
    } else {
    this.fileUpload(files.item(0)).subscribe(res => {
      console.log(res);
    });
  }
}
public fileUpload(files: any) {
  return Observable.create(observer => {
    const formData: FormData = new FormData();
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    const ids = JSON.parse(sessionStorage.getItem('teacherAndCourseId'));
    formData.append(`doc_question`, files, files.name);
    formData.append('topic', this.assignmentTopic);
    formData.append('teacher', ids.teacherId);
    formData.append('course', ids.courseId);


    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          observer.next(JSON.parse(xhr.response));
          this.toastr.success('File uploaded succesfully!', 'Success');

          observer.complete();
        } else {
          observer.error(xhr.response);
          this.toastr.error("Failed to upload file!", "Failed")
        }
      }
    };

    xhr.upload.onprogress = (event) => {
       this.progressLoading.next(Math.round(event.loaded / event.total * 100));
    };

    xhr.open('POST', AppUrl.uploadDocs(), true);
    // if (this.globalService.getAccessToken()) {
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      // xhr.setRequestHeader('Env-id', this.globalService.getSelf().getCurrentEnvironment().envMappingId + '');
    xhr.setRequestHeader('Authorization', 'Token ' + StorageService.getItem('token'));
    // }
    xhr.send(formData);
  });
}



}
