import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/service/student.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-homework',
  templateUrl: './student-homework.component.html',
  styleUrls: ['./student-homework.component.css']
})
export class StudentHomeworkComponent implements OnInit {

  assignmentQuestions = [];
  isLoading = false;
  uploadedAnswerResp: any;
  answers = [];

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fetchAssignmentQuestions();
    this.answer();
  }

  answer(){
    this.studentService.answers().subscribe(res => {
      this.answers = res;
    })
  }

  fetchAssignmentQuestions() {
    this.isLoading = true;
    this.studentService.fetchAssignmentQuestions().subscribe(res => {
      this.isLoading = false;
      this.assignmentQuestions = res;
    })
  }

  viewQuestions(url){
    window.open(url, "_new");
  }

  downloadQuestions(){}

  uploadAnswers(fileInput, question, questionTopic) {
    const formData: FormData = new FormData();
    const files: File = fileInput.target.files;
    formData.append('doc_answer', files[0], files[0].name);
    formData.append('student', "3");
    formData.append('question', question.id);
    formData.append('json_answer', JSON.stringify(questionTopic));
    this.studentService.uploadAnswers(formData).subscribe(data => {
      this.uploadedAnswerResp = data;
      this.toastr.success("File uploaded succesfully!", "Success")
      this.answer();
    },
    error => {
      this.toastr.error("An answer has already been submitted to this question.", "Failed")
    });
  }

}
