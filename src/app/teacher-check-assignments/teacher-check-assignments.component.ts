import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-teacher-check-assignments',
  templateUrl: './teacher-check-assignments.component.html',
  styleUrls: ['./teacher-check-assignments.component.css']
})
export class TeacherCheckAssignmentsComponent implements OnInit {
  isLoading:boolean;
  studentAssignmentDataSubjectWise;
  studentAssignmentDataTopicWise;
  assignmentData=[];
  valueWithOutSubjectFilter;
  subjectFilter:boolean=false;
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
  constructor(public studentService:StudentService,public teacherService: TeacherService) {
    this.fetchAssignmentDataSubject();
   }

  ngOnInit() {
  }
  
  fetchAssignmentDataSubject() {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchAssignmentQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataSubjectWise = res;
      this.valueWithOutSubjectFilter=[...this.studentAssignmentDataSubjectWise]
    });
  }
  fetchAssignmentDataTopicWise(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchAssignmentQuestionsTopic(id).subscribe(res => {
      this.isLoading = false;
      this.studentAssignmentDataTopicWise = res;
      this.studentAssignmentDataSubjectWise=[];
    });
  }
  fetchAssignmentData(id:number) {
    this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchAssignmentData(id).subscribe(res => {
      this.isLoading = false;
      this.assignmentData = res;
      this.studentAssignmentDataTopicWise=[];
      this.studentAssignmentDataSubjectWise=[];
    });
  }
  getDate(date){
    return (new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear());
  }
  classSelected(event){
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
  // isLoading = false;

  // assignmentTopicsList = [];
  // dummyData;
  // classesDummyData: { class: string; when: string; }[];
  // teacherId: any;

  // constructor(
  //   public teacherService: TeacherService
  // ) {
  // }

  // ngOnInit() {
  //   this.dummyData = [
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     },
  //     {
  //       "name": "Ram",
  //       "topic": "Law of Thermodynamic",
  //       "numOfPages": "6"
  //     }
  //   ];

  //   this.classesDummyData = [
  //     {
  //       "class": "X Std A",
  //       "when": "10:00"
  //     },
  //     {
  //       "class": "X Std B",
  //       "when": "11:00"
  //     },
  //     {
  //       "class": "X Std C",
  //       "when": "12:00"
  //     },
  //     {
  //       "class": "X Std D",
  //       "when": "13:00"
  //     },
  //     {
  //       "class": "X Std E",
  //       "when": "14:00"
  //     }
  //   ]
  //   this.fetchTeacher();
  // }

  // fetchTeacher() {
  //   this.teacherService.fetchTeacher().subscribe(res => {
  //     this.teacherId = res.id;
  //     this.getAssignmentData('this');
  //   })
  // }

  // getAssignmentData(when) {
  //   this.isLoading = true;
  //   this.teacherService.getAssignmentlist(this.teacherId, when).subscribe(res => {
  //     this.isLoading = false;
  //     this.assignmentTopicsList = res;
  //     console.log("Assignment data = "+JSON.stringify(this.assignmentTopicsList))

  //   });
  // }
}
