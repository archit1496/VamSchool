import { TeacherService } from 'src/service/teacher.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-assignements',
  templateUrl: './student-assignements.component.html',
  styleUrls: ['./student-assignements.component.css']
})
export class StudentAssignementsComponent implements OnInit {
  // isLoading: boolean;
  commentText = '';
  commentData = [];
  specificTopicDetail;
  studentAssignmentDataSubjectWise;
  studentAssignmentDataTopicWise;
  studentAssignmentData = false;
  assignmentData = [];
  assignmentQuestion;

  // valueWithOutSubjectFilter;
  subjectFilter: boolean = false;
  assignmentActivityData;
  assignmentTopicDetail;
  questionId: number = -1;
  subjectFilterData = [];
  enableActivity = true;
  enableComment = false;
  studentId = sessionStorage.getItem('student_id');
  clearFiles = '';
  fileSize = 0;
  bindFileDetails = [];
  totalTextFiles = [];
  isAssignmentSubmitted = true;
  issubjectFilterData = false;
  constructor(public studentService: StudentService, public toaster: ToastrService, 
    public teacherService: TeacherService) {

  }

  ngOnInit() {
    this.fetchAssignmentDataSubject();
    this.fetchAssignmentActivity();
  }
  fetchAssignmentActivity() {
    this.subjectFilter = false;
    // this.isLoading = true;
    this.studentService.fetchAssignmentActivity().subscribe(res => {
      // this.isLoading = false;
      this.assignmentActivityData = res;
    });
  }

  // fetchAssignmentDataSubject() {
  //   this.subjectFilter = false;
  //   this.isLoading = true;
  //   this.studentService.fetchAssignmentQuestionsSubject().subscribe(res => {
  //     this.isLoading = false;
  //     this.studentAssignmentDataSubjectWise = res.assignment_dirs;
  //     // alert(res);
  //     // this.valueWithOutSubjectFilter = [...this.studentAssignmentDataSubjectWise.assignment_dirs];
  //     // console.log("DATA = "+JSON.stringify(this.studentAssignmentDataSubjectWise))
  //   });
  // }

  fetchAssignmentDataSubject(){
    this.studentService.fetchStudentSubject().subscribe(res => {
    this.studentAssignmentDataSubjectWise = res;
  });
}

  fetchAssignmentDataSubject2(id) {
    this.subjectFilter = false;
    // this.isLoading = true;
    this.studentService.fetchAssignmentQuestionsSubject2(id).subscribe(res => {
    // this.isLoading = false;

    this.subjectFilterData = res.assignment_dirs;
    this.issubjectFilterData = true;
    this.studentAssignmentDataSubjectWise = [];
    
    // alert(res);
    // this.valueWithOutSubjectFilter = [...this.studentAssignmentDataSubjectWise.assignment_dirs];
    // console.log("DATA = "+JSON.stringify(this.studentAssignmentDataSubjectWise))
    });
  }

  formatAMPM(d) {
    var date = new Date(d);
    var hours:any = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm:string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime:string = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  fetchAssignmentDataTopicWise(id: number) {
    this.subjectFilter = false;
    // this.isLoading = true;
    this.studentService.fetchAssignmentData(id).subscribe(res => {
    // this.isLoading = false;


    this.studentAssignmentDataTopicWise = res;
    this.studentAssignmentData = true;
    this.studentAssignmentDataSubjectWise = [];
    // this.subjectFilterData = [];
    this.issubjectFilterData = false;
    this.enableActivity = false;
    // this.enableComment = true;
    // console.log("TOPIC WISE = "+JSON.stringify(this.studentAssignmentDataTopicWise))
    });
  }

  getTopicDetails(id) {
    this.questionId = id;
    this.subjectFilter = false;
    // this.isLoading = true;
    this.studentService.fetchAssignmentTopicData({ 'question': id }).subscribe(res => {
    // this.isLoading = false;
    this.studentAssignmentData = false;

    this.enableComment = true;
if (res.length) {
  this.isAssignmentSubmitted = false;

} else {
  this.assignmentTopicDetail = res;
}

    })
  }

  getId(id) {
    return("item");
  }

  getBsId(id){
    return("item");
  }

  getHeaderId(id) {
    return("header");
  }
  
  uploadNotes(files) {
    const formData: FormData = new FormData();
    // const files: File = fileInput.target.files;
for (let index = 0; index < files.length; index++) {
  // const element = array[index];
    formData.append('files', files[index], files[index].name);
  
}
      // formData.append('files', (files));

    // formData.append('doc_answer', files, files.name);
    formData.append('question', String(this.questionId));
    formData.append('student',  sessionStorage.getItem('student_id'));
    this.studentService.uploadAssignment(formData).subscribe(data => {

      if (data && data['status'] === false) {
        alert(data['detail'])
      } else {
        this.clearFiles = '';
        this.totalTextFiles = [];
        this.fileSize = 0;
        this.bindFileDetails = [];
        this.toaster.success("File uploaded succesfully!", "Success");
      }

    },
      error => {
        // this.spinnerFlag = false;
        this.toaster.error("Failed to upload file!", "Failed")
      });
  }
  // fetchAssignmentData(id:number) {
  //   this.subjectFilter=false;
  //   this.isLoading = true;
  //   this.studentService.fetchAssignmentData(id).subscribe(res => {
  //     this.isLoading = false;
  //     this.assignmentData = res;
  //     this.studentAssignmentDataTopicWise=[];
  //     this.studentAssignmentDataSubjectWise=[];
  //   });
  // }
  getDate(date) {
    return (new Date(date).getDate() + '-' + new Date(date).getMonth() + '-' + new Date(date).getFullYear());
  }

  // subjectSelected(event) {
  //   this.subjectFilter = true;
  //   this.assignmentData = [];
  //   this.studentAssignmentDataTopicWise = [];
  //   this.studentAssignmentDataSubjectWise = [];
  //   if (event === 'All') {
      // this.studentAssignmentDataSubjectWise = [...this.valueWithOutSubjectFilter];
    // }
    // else {
      // let filterValue = this.valueWithOutSubjectFilter.filter(elm => elm.name == event);
      // this.studentAssignmentDataSubjectWise = filterValue;
      // console.log("ddddd", this.studentAssignmentDataSubjectWise);
  //   }
  //   console.log("DATA 1 = "+JSON.stringify(this.studentAssignmentDataSubjectWise))
  // }

  onDownloadClick() {
    let filterValue=this.studentAssignmentDataTopicWise.filter(elm=>elm.id==this.questionId);

    window.open(filterValue[0].doc_question);
  }

  getFileType(url:string){
    if(url)
    return url.split(".")[url.split(".").length-1];
  }


  showComments(id) {
    const obj = {'assignment_answer': id};
    this.teacherService.fetchComments(obj).subscribe((res) => {
   this.commentData = res.chat;
    });
  }

  addComment() {
    const formData: FormData = new FormData();
    formData.append('assignment_answer', this.specificTopicDetail.assignment_answer.id);

    formData.append('content', this.commentText);
    
    this.teacherService.addComments(formData).subscribe((res) => {
      if (res.status) {
        this.toaster.success('Added succesfully!', 'Success');
        this.commentText = '';
        this.showComments(this.specificTopicDetail.assignment_answer.id);
      }
    }); 
  }

  uploadedData(target) {
    let totalUploadedImageSize = 0;

    for (let i = 0; i < target.files.length; i++) {
        this.totalTextFiles = target.files;
        const imageSize = (Math.round((((target.files[i].size) / 1024) / 1024) * 100) / 100).toString();
        totalUploadedImageSize += parseFloat(imageSize);
        let mbSize;
        if (target.files[i].size >= 1048576) {
          mbSize = (((target.files[i].size) / 1024) / 1024).toFixed(2) + 'MB';
        } else if (target.files[i].size >= 1024 && target.files[i].size < 1048576) {
          mbSize = ((target.files[i].size) / 1024).toFixed(3) + 'KB';
        } else if (target.files[i].size < 1024) {
          mbSize = ((target.files[i].size) / 1024).toFixed(3) + 'bytes';
        }
        this.bindFileDetails.push({
          fileName: target.files[i].name,
          fileSize: mbSize,
          fileSizeInMB: imageSize
        });
    }
    this.fileSize = this.fileSize + totalUploadedImageSize;
  }

  removeItem(index: number) {
    this.fileSize = 0;
    let tempSize = 0;
    this.bindFileDetails.splice(index, 1);
    for (let i = 0; i < this.bindFileDetails.length; i++) {
      tempSize += parseFloat(this.bindFileDetails[i].fileSizeInMB);
    }
    let fileArray = Array.from(this.totalTextFiles);
    fileArray.splice(index, 1);
    this.totalTextFiles = fileArray;
    this.fileSize = this.fileSize + (Math.round(tempSize * 100) / 100);

  }

  uploadDocument() {
    if (this.totalTextFiles.length === 0) {
alert('Please Upload files.')
    } else {

this.uploadNotes(this.totalTextFiles)
    }
  }
}