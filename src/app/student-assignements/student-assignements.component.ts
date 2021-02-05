import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-assignements',
  templateUrl: './student-assignements.component.html',
  styleUrls: ['./student-assignements.component.css']
})
export class StudentAssignementsComponent implements OnInit {
  isLoading: boolean;
  studentAssignmentDataSubjectWise;
  studentAssignmentDataTopicWise;
  assignmentData = [];
  // valueWithOutSubjectFilter;
  subjectFilter: boolean = false;
  assignmentActivityData;
  assignmentTopicDetail;
  questionId: number = -1;

  subjectFilterData = [];
  constructor(public studentService: StudentService, public toaster: ToastrService) {

  }

  ngOnInit() {
    this.fetchAssignmentDataSubject();
    this.fetchAssignmentActivity();
  }
  fetchAssignmentActivity() {
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentActivity().subscribe(res => {
      this.isLoading = false;
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
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestionsSubject2(id).subscribe(res => {
      this.isLoading = false;
      this.subjectFilterData = res.assignment_dirs;
      this.studentAssignmentDataSubjectWise = [];
      // alert(res);
      // this.valueWithOutSubjectFilter = [...this.studentAssignmentDataSubjectWise.assignment_dirs];
      // console.log("DATA = "+JSON.stringify(this.studentAssignmentDataSubjectWise))
    });
  }

  fetchAssignmentDataTopicWise(id: number) {
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentData(id).subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataTopicWise = res;
     this.studentAssignmentDataSubjectWise = [];
     this.subjectFilterData = [];
      // console.log("TOPIC WISE = "+JSON.stringify(this.studentAssignmentDataTopicWise))
    });
  }

  getTopicDetails(id) {
    this.questionId = id;
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentTopicData({ 'question': id }).subscribe(res => {
    this.isLoading = false;
    this.assignmentTopicDetail = res;
    })
  }
  
  uploadNotes(fileInput) {
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('doc_answer', files[0], files[0].name);
    formData.append('question', String(this.questionId));
    formData.append('student',  sessionStorage.getItem('student_id'));
    this.studentService.uploadAssignment(formData).subscribe(data => {

      if (data && data['status'] === false) {
        alert(data['detail'])
      } else {
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

  subjectSelected(event) {
    this.subjectFilter = true;
    this.assignmentData = [];
    this.studentAssignmentDataTopicWise = [];
    this.studentAssignmentDataSubjectWise = [];
    if (event === 'All') {
      // this.studentAssignmentDataSubjectWise = [...this.valueWithOutSubjectFilter];
    }
    else {
      // let filterValue = this.valueWithOutSubjectFilter.filter(elm => elm.name == event);
      // this.studentAssignmentDataSubjectWise = filterValue;
      // console.log("ddddd", this.studentAssignmentDataSubjectWise);
    }
    console.log("DATA 1 = "+JSON.stringify(this.studentAssignmentDataSubjectWise))
  }

  onDownloadClick(url) {
    window.open(url);
  }

  getFileType(url:string){
    if(url)
    return url.split(".")[url.split(".").length-1];
  }
}