import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-assignements',
  templateUrl: './student-assignements.component.html',
  styleUrls: ['./student-assignements.component.css']
})
export class StudentAssignementsComponent implements OnInit {
  isLoading:boolean;
  studentAssignmentDataSubjectWise;
  studentAssignmentDataTopicWise;
  assignmentData=[];
  valueWithOutSubjectFilter;
  subjectFilter:boolean=false;
  assignmentActivityData;
  dummyData = [
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Physics'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Chemistry'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    {
      "noOfFiles": "10 Files",
      "update": "Last Update Today",
      "subject":'Maths'
    },
    // {
    //   "noOfFiles": "10 Files",
    //   "update": "Last Update Today",
    //   "subject":'Maths'
    // },
  ]
  constructor(public studentService:StudentService) {
    this.fetchAssignmentDataSubject();
    this.fetchAssignmentActivity();
   }

  ngOnInit() {
  }
  fetchAssignmentActivity() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchAssignmentActivity().subscribe(res => {
      this.isLoading = false;
      this.assignmentActivityData = res;
      
    });
  }
  
  fetchAssignmentDataSubject() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataSubjectWise = res;
      this.valueWithOutSubjectFilter=[...this.studentAssignmentDataSubjectWise]
    });
  }
  fetchAssignmentDataTopicWise(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestionsTopic(id).subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataTopicWise = res;
      this.studentAssignmentDataSubjectWise=[];
    });
  }
  fetchAssignmentData(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.studentService.fetchAssignmentData(id).subscribe(res => {
      this.isLoading = false;
      this.assignmentData = res;
      this.studentAssignmentDataTopicWise=[];
      this.studentAssignmentDataSubjectWise=[];
    });
  }
  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  subjectSelected(event){
    this.subjectFilter=true;
    this.assignmentData = [];
      this.studentAssignmentDataTopicWise=[];
      this.studentAssignmentDataSubjectWise=[];
    if(event==='All')
    {
      this.studentAssignmentDataSubjectWise=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.valueWithOutSubjectFilter.filter(elm=>elm.name==event);
      this.studentAssignmentDataSubjectWise=filterValue;
      console.log("ddddd",this.studentAssignmentDataSubjectWise);

    }
  }
  onAssignmentClick(url){
    window.open(url);
  }
}