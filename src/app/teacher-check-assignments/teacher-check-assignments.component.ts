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
  commentText = '';
  specificStudent = {student : {first_name: '', last_name: ''}, id: null};
  AssignmentClick2;
  openAddNewAssignmentPage;
  status;
  thirdClass = false;
  firstClass = false;
  secondClass = false;
  thirdPage = [];
  showHideList = true;
commentData = [];
  showHideFinalActivity = false;
  updateHeaderText = 'This week';
  isLoading: boolean;
  studentAssignmentDataSubjectWise;
  selectedStudentAssignmentDataSubjectWise;
  selectedCourse = '0';
  submissionDate;
  assignmentData = [];
  topicName;
  topicQuestion;
  files;
  AssignmentClick;
  // valueWithOutSubjectFilter;
  particularAssign = [];
  showCommentSection = false;
  activityData = [];
  // teacherCourseData = [];
  visibleIndex = -1;
  showActivity = true;

  update(studentActivity, e) {

    const formData: FormData = new FormData();
    if (e.target.files) {
      formData.append('doc_answer', e.target.files[0], e.target.files[0].name);
    } else {

      formData.append('mark', e.target.value);
    }

    this.teacherService.updateAssignmentMarks(studentActivity.id, formData).subscribe((res) => {
      this.toastr.success('updated succesfully!', 'Success');
      this.onAssignmentClick2(this.AssignmentClick2.id);
    });
  }

  download(studentActivity) {
    window.open(studentActivity.doc_answer);
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
      this.commentText = '';
    } else {
      this.visibleIndex = ind;
      this.commentText = '';

    }
  }

  openForm() {
    this.openAddNewAssignmentPage = true;
    this.secondClass = false;

    // this.fetchCourse();

    // this.topicName = '';
    // this.topicQuestion = '';
    // this.files = null;
    // //  (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = "";
    // const someElement = document.getElementById('mainDiv');
    // someElement.className += ' newclass';

  }

  openForm2() {
    this.openAddNewAssignmentPage = true;
    this.secondClass = false;
    this.thirdClass = false;
  }

  closeForm() {

    document.getElementById('myForm').style.display = 'none';
    const element = document.getElementById('mainDiv');
    element.classList.remove('newclass');

  }


  fetchAssignmentDataSubject() {

    this.isLoading = true;
    this.teacherService.fetchTeacherCourse().subscribe(res => {

      this.isLoading = false;
      this.firstClass = true;
      this.studentAssignmentDataSubjectWise = res.data;
    });
  }

  // fetchAssignmentDataTopicWise(id:number) {

  //   this.isLoading = true;
  //   this.teacherService.fetchAssignmentQuestionsTopic(id).subscribe(res => {

  //     this.isLoading = false;

  //   });
  // }

  fetchAssignmentData(id: number) {
    const data: FormData = new FormData();
    data.append('course_id', id.toString());
    this.isLoading = true;
    this.status = 'topic';
    this.teacherService.fetchAssignmentData2(data).subscribe(res => {
      this.firstClass = false;
      this.secondClass = true;
      this.thirdClass = false;
      this.showHideList = false;
      this.isLoading = false;

      this.assignmentData = res.data;


    });
  }

  uploadAssignment(fileInput) {
    this.files = fileInput.target.files;
  }

  postAssignmentData(addNewAssignment) {

    if (addNewAssignment.type === 'all') {
      this.isLoading = true;
      const formData: FormData = new FormData();
      formData.append('topic', addNewAssignment.topic);
      formData.append('description', addNewAssignment.topicQuestion);
      formData.append('doc_question', addNewAssignment.files[0], addNewAssignment.files[0].name);
      formData.append('course', addNewAssignment.selectedCourse);
      formData.append('dead_line', addNewAssignment.date);
      formData.append('topic_dir', this.AssignmentClick.id);
      formData.append('max_mark', addNewAssignment.marks);
      this.teacherService.addNewAssignmentData(this.AssignmentClick.id, formData).subscribe(res => {
        this.toastr.success('Added succesfully!', 'Success');
        this.isLoading = false;
        this.openAddNewAssignmentPage = false;
        this.onAssignmentClick(this.AssignmentClick.id);
        this.thirdClass = true;

        this.openAddNewAssignmentPage = false;
      });
    } else if (addNewAssignment.type === 'topic') {
      this.isLoading = true;
      const topicData: FormData = new FormData();
      topicData.append('name', addNewAssignment.topic);
      topicData.append('course', this.selectedStudentAssignmentDataSubjectWise.id);
      this.teacherService.addNewAssignmentData2(topicData).subscribe(res => {
        this.toastr.success('Added succesfully!', 'Success');
        this.isLoading = false;
        this.fetchAssignmentData(this.selectedStudentAssignmentDataSubjectWise.id);
        this.secondClass = true;

        this.openAddNewAssignmentPage = false;
      });
    } else if (addNewAssignment.status === 'closetopic') {
      this.secondClass = true;

      this.openAddNewAssignmentPage = false;
    } else if (addNewAssignment.status === 'closeall') {
      this.thirdClass = true;

      this.openAddNewAssignmentPage = false;
    }




  }

  get Math() {
    return Math;
  }
  get Infinity() {
    return Infinity;
  }

  getSubmissionDate(date) {
    let d = new Date(date);
    return (d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear());
  }

  getDate(date) {
    return (new Date(date).getDate() + '-' + new Date(date).getMonth() + '-' + new Date(date).getFullYear());
  }
  // fetchAssignmentData method
  onAssignmentClick(id) {

    this.isLoading = true;
    this.teacherService.fetchAssignmentData(id).subscribe(res => {

      // this.teacherService.fetchTeacherDashboardActivity('question=' + id).subscribe(res => {
      this.isLoading = false;
      // this.showHideFinalActivity = true;

      this.status = 'all';
      this.secondClass = false;
      this.thirdClass = true;
      this.showHideList = false;

      this.thirdPage = res;

    });
  }

  onAssignmentClick2(id) {

    this.isLoading = true;
    // this.teacherService.fetchAssignmentData(id).subscribe(res => {

    this.teacherService.fetchTeacherDashboardActivity('question=' + id).subscribe(res => {
      this.isLoading = false;
      this.showHideFinalActivity = true;

      this.status = 'all';
      this.secondClass = false;
      this.thirdClass = false;
      this.showHideList = true;
      this.particularAssign = res;
      this.showCommentSection = true;

      this.showActivity = false;
    });
  }

  showComments(id) {
    const obj = {'assignment_answer': id};
    this.teacherService.fetchComments(obj).subscribe((res) => {
   this.commentData = res.chat;
    });
  }

  addComment() {
 
    const formData: FormData = new FormData();
    formData.append('assignment_answer', this.specificStudent.id);

    formData.append('content', this.commentText);
    
    this.teacherService.addComments(formData).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Added succesfully!', 'Success');
        this.showComments(this.specificStudent.id);
      }
  

       }); 
  }

  getActivityData(id, e?) {


    if (e !== undefined) {
      this.updateHeaderText = e.target.innerText;
    }

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
