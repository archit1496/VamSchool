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
  valueWithOutSubjectFilter;
  subjectFilter: boolean = false;
  assignmentActivityData;
  assignmentTopicDetail;
  questionId: number = -1;

  dummyData = [
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Physics'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject": 'Maths'
    },
    // {
    //   "noOfFiles": "10 Files",
    //   "update": "Last Update Today",
    //   "subject":'Maths'
    // },
  ]
  constructor(public studentService: StudentService, public toaster: ToastrService) {
    this.fetchAssignmentDataSubject();
    this.fetchAssignmentActivity();
  }

  ngOnInit() {
  }
  fetchAssignmentActivity() {
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentActivity().subscribe(res => {
      this.isLoading = false;
      this.assignmentActivityData = res;

    });
  }

  fetchAssignmentDataSubject() {
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataSubjectWise = res;
      this.valueWithOutSubjectFilter = [...this.studentAssignmentDataSubjectWise]
    });
  }
  fetchAssignmentDataTopicWise(id: number) {
    this.subjectFilter = false;
    this.isLoading = true;
    this.studentService.fetchAssignmentData(id).subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataTopicWise = res;
      this.studentAssignmentDataSubjectWise = [];
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
    formData.append('student', sessionStorage.getItem('student_id'));
    this.studentService.uploadAssignment(formData).subscribe(data => {
      this.toaster.success("File uploaded succesfully!", "Success");
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
      this.studentAssignmentDataSubjectWise = [...this.valueWithOutSubjectFilter];
    }
    else {
      let filterValue = this.valueWithOutSubjectFilter.filter(elm => elm.name == event);
      this.studentAssignmentDataSubjectWise = filterValue;
      console.log("ddddd", this.studentAssignmentDataSubjectWise);

    }
  }
  onDownloadClick(url) {
    window.open(url);
  }
  getFileType(url:string){
    if(url)
    return url.split(".")[url.split(".").length-1];
  }
}