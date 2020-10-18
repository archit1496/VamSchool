import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-student-assignements',
  templateUrl: './student-assignements.component.html',
  styleUrls: ['./student-assignements.component.css']
})
export class StudentAssignementsComponent implements OnInit {
  isLoading:boolean;
  studentAssignmentData;
  valueWithOutSubjectFilter;
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
    this.fetchAssignmentData();
   }

  ngOnInit() {
  }
  
  fetchAssignmentData() {
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestions().subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentData = res;
      this.valueWithOutSubjectFilter=[...this.studentAssignmentData]
    });
  }

  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  subjectSelected(event){
    if(event==='All')
    {
      this.studentAssignmentData=[...this.valueWithOutSubjectFilter];
    }
    else{
      let filterValue=this.studentAssignmentData.filter(elm=>elm.course.subject.subject_name=='event');
      this.studentAssignmentData=filterValue;
      console.log("ddddd",this.studentAssignmentData);

    }
  }
}