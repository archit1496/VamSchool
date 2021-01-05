import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/service/teacher.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/service/student.service';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teacher-check-assignments',
  templateUrl: './teacher-check-assignments.component.html',
  styleUrls: ['./teacher-check-assignments.component.css']
})
export class TeacherCheckAssignmentsComponent {
  
  constructor(public teacherService: TeacherService, private toastr: ToastrService) {
    this.fetchAssignmentDataSubject();
    this.getActivityData('week=this');
  }

  openAddNewAssignmentPage;
  // @ViewChild('firstClass',null) firstClass: ElementRef;
  // serverCreated = false;
  firstClass = false;
  secondClass = false;
  showHideList = true;
  showHideActivity = true;
  showHideFinalActivity = false;
  updateHeaderText = 'This week';
  isLoading: boolean;
  studentAssignmentDataSubjectWise;
  selectedStudentAssignmentDataSubjectWise;
  selectedCourse = '0';
  // studentAssignmentDataTopicWise;
  assignmentData = [];
  topicName;
  topicQuestion;
  files;
  // valueWithOutSubjectFilter;
  particularAssign = [];
  // subjectFilter:boolean=false;
  activityData = [];
  teacherCourseData = [];
  visibleIndex = -1;

  update(studentActivity, e) {

    const formData: FormData = new FormData();
    if (e.target.files) {
      formData.append('doc_answer', e.target.files[0], e.target.files[0].name);
    } else {

      formData.append('mark', e.target.value);
    }

    this.teacherService.updateAssignmentMarks(studentActivity.id, formData).subscribe((res) => {
      this.toastr.success('updated succesfully!', 'Success');

    });
  }

  // fetchCourse() {
  //   this.teacherService.fetchTeacherCourse().subscribe(res => {
  //     this.teacherCourseData = res.data;
  //   });
  // }


  download(studentActivity) {
    window.open(studentActivity.doc_answer);
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  openForm() {
    this.openAddNewAssignmentPage = true;
    this.secondClass = false;

    // this.fetchCourse();
    // document.getElementById('myForm').style.display = 'block';
    // this.topicName = '';
    // this.topicQuestion = '';
    // this.files = null;
    // //  (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = "";
    // const someElement = document.getElementById('mainDiv');
    // someElement.className += ' newclass';

  }

  closeForm() {

    document.getElementById('myForm').style.display = 'none';
    const element = document.getElementById('mainDiv');
    element.classList.remove('newclass');

  }


  fetchAssignmentDataSubject() {
    // this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchAssignmentQuestionsSubject().subscribe(res => {
      this.isLoading = false;
      this.firstClass = true;
      this.studentAssignmentDataSubjectWise = res;
      // this.valueWithOutSubjectFilter=[...this.studentAssignmentDataSubjectWise]
    });
  }

  // fetchAssignmentDataTopicWise(id:number) {
  //   this.subjectFilter=false;
  //   this.isLoading = true;
  //   this.teacherService.fetchAssignmentQuestionsTopic(id).subscribe(res => {

  //     this.isLoading = false;
  //     this.studentAssignmentDataTopicWise = res;
  //     this.studentAssignmentDataSubjectWise=[];
  //   });
  // }

  fetchAssignmentData(id: number) {
    // this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchAssignmentData(id).subscribe(res => {
      this.firstClass = false;
      this.secondClass = true;
      this.showHideList = false;
      this.showHideActivity = false;
      this.isLoading = false;
      this.assignmentData = res;
      // this.studentAssignmentDataTopicWise=[];
      // this.studentAssignmentDataSubjectWise=[];
    });
  }

  uploadAssignment(fileInput) {
    this.files = fileInput.target.files;
  }

  postAssignmentData(addNewAssignment) {

    if (addNewAssignment.status === 'save') {
      this.isLoading = true;
      const formData: FormData = new FormData();
      formData.append('doc_question', addNewAssignment.files[0], addNewAssignment.files[0].name);
      formData.append('dead_line', addNewAssignment.date);
      formData.append('topic', addNewAssignment.topic);
      formData.append('dir', this.selectedStudentAssignmentDataSubjectWise.id);
      formData.append('max_mark', addNewAssignment.marks);
  
      formData.append('description', addNewAssignment.topicQuestion);
      formData.append('course', addNewAssignment.selectedCourse);
      formData.append('teacher', this.selectedStudentAssignmentDataSubjectWise.teacher);
      this.teacherService.addNewAssignmentData(this.selectedStudentAssignmentDataSubjectWise.id, formData).subscribe(res => {
        this.toastr.success('Added succesfully!', 'Success');
        this.isLoading = false;
      });
    } 
    this.secondClass = true;

    this.openAddNewAssignmentPage = false;



  }

  get Math() {
    return Math;
  }
    get Infinity() {
    return Infinity;
  }
  getDate(date) {
    return (new Date(date).getDate() + '-' + new Date(date).getMonth() + '-' + new Date(date).getFullYear());
  }
  // classSelected(event){
  //   this.subjectFilter=true;
  //   this.assignmentData = [];
  //     this.studentAssignmentDataTopicWise=[];
  //     this.studentAssignmentDataSubjectWise=[];
  //   if(event==='All')
  //   {
  //     this.studentAssignmentDataSubjectWise=[...this.valueWithOutSubjectFilter];
  //   }
  //   else{
  //     let filterValue=this.valueWithOutSubjectFilter.filter(elm=>elm.name==event);
  //     this.studentAssignmentDataSubjectWise=filterValue;

  //   }
  // }
  onAssignmentClick(id) {
    // window.open(url);
    // this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchTeacherDashboardActivity('question=' + id).subscribe(res => {
      this.isLoading = false;
      this.showHideFinalActivity = true;
      this.secondClass = false;

      this.particularAssign = res;
    });
  }

  getActivityData(id, e?) {


    if (e !== undefined) {
      this.updateHeaderText = e.target.innerText;
    }
    // this.subjectFilter=false;
    this.isLoading = true;
    this.teacherService.fetchTeacherDashboardActivity(id).subscribe(res => {
      this.isLoading = false;
      this.activityData = res;
    });
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

  //   });
  // }
}
