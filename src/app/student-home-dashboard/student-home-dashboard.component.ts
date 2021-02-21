import { TeacherService } from 'src/service/teacher.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { ZoomMtg } from '@zoomus/websdk';
import { StudentService } from 'src/service/student.service';
import { StorageService } from 'src/service/storage.service';
import { EventEmitter } from 'events';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


@Component({
  selector: 'app-student-home-dashboard',
  templateUrl: './student-home-dashboard.component.html',
  styleUrls: ['./student-home-dashboard.component.css']
})

export class StudentHomeDashboardComponent implements OnInit {
  signatureEndpoint = 'https://api.onwardlearn.in/live/signature';
  apiKey = 'pgl-ugf3QLubAI30B5EBag';
  // meetingNumber: string = '84675760804';
  role: string = '1';
  leaveUrl = 'https://vamschool.in/wrapper/studashboard';
  userName = '';
  userEmail = '';
  // passWord = 'WHliSWRZUkFiV3lJOE5KNUVWYTNZdz09'
  signature: any;
  // isLoading:boolean;
  studentDataList;
  todayClassData;
  dashboardActivityData;
  hideJoinBtn = true;
  disableJoinBtn = true;
  attendenceChart;
  isAttendence = false;
  PerformanceChart;
  isPerformance = false;
  isLeaderboard = false;
  constructor(private router: Router,public studentService:StudentService,  public teacherService: TeacherService) {
    this.fetchStudentDetails();
    this.fetchDashboardActivityData();
    console.log("width",screen.width)
  }

  ngOnInit() {
    
  }

  toggleAttendence() {
    if (this.isAttendence === true) {
      this.isAttendence = false;
      delete this.attendenceChart ;
    } 
    else if (this.isAttendence === false) {
      this.isAttendence = true;
      this.isPerformance = false;
      this.isLeaderboard = false;
      setTimeout(function(){ Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
          if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
          }
        }
      });
      // Chart.defaults.global.defaultFontColor = 'rgba(255, 175, 204, 0.2)';
      let ctx = document.getElementById('attendenceChart');
      this.myChart = new Chart(ctx, {
          type: 'line',
          pointHoverRadius: 20,
          // defaultFontColor: 'rgba(255, 175, 204, 0.2)',
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
              datasets: [{
                  label: 'Anuj\'s',
                  data: [5,7,15,10,20,15,25,18,28,25,30],
                  backgroundColor: [
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)'
                  ],
                  borderColor: [
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)'
                  ],
                  borderWidth: 2,
                  hitRadius: 5,
                  hoverRadius: 14,
                  radius: 8,
                  rotation: 180,
                  pointStyle: 'circle',
                  showLine: 'true'
              },
            ]
          },
          options: {
              animation: {
                duration: 4000,
                easing: 'easeInOutElastic',
              },
              chartArea: {
                backgroundColor: 'rgba(0, 151, 167, 0.2)'
              },
              responsive: true,
              title: {
                    display: true,
                    text: 'Your Attendence',
                    position: 'top',
                    fontFamily: 'MulishRegular',
                    fontColor: '#faf9f9',
                    fontSize: 30,
                },
              legend: {
                  display: false
              },
                layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                  }
              },
              tooltips: {
                mode: 'label',
                titleFontSize: 20,
                bodyFontSize: 18
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                  hover: {
                    animationDuration: 100 // duration of animations when hovering an item
                  },
                  xAxes: [{
                    gridLines: {
                      display: true,
                      color: 'rgb(191, 255, 244)',
                      lineWidth: 0.2,
                    },
                    ticks: {
                      fontColor: 'rgb(191, 255, 244)',
                      fontSize: 20,
                  }
                  }],
                  yAxes: [{
                      gridLines: {
                        display: true,
                        color: 'rgb(191, 255, 244)',
                        lineWidth: 0.2,
                      },
                      ticks: {
                          beginAtZero: true,
                          stepSize: 4,
                          suggestedMax: 31,
                          fontColor: 'rgb(191, 255, 244)',
                          fontSize: 20,
                      }
                  }]
              }
            }
          });
        }, 500);
    }
  }

  togglePerformance() {
    if (this.isPerformance === true) {
      this.isPerformance = false;
      delete this.PerformanceChart ;
    } 
    else if (this.isPerformance === false) {
      this.isPerformance = true;
      this.isAttendence = false;
      this.isLeaderboard = false;
      setTimeout(function(){ Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
          if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
          }
        }
      });
      let ctx = document.getElementById('performanceChart');
      this.PerformanceChart = new Chart(ctx, {
          type: 'line',
          pointHoverRadius: 20,
          data: {
              labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
              datasets: [{
                  label: 'Anuj\'s',
                  data: [65,76,85,90,80,95],
                  backgroundColor: [
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)',
                    'rgba(0, 151, 167, 0.2)'
                  ],
                  borderColor: [
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)',
                    'rgb(191, 255, 244)'
                  ],
                  borderWidth: 2,
                  hitRadius: 5,
                  hoverRadius: 14,
                  radius: 8,
                  rotation: 180,
                  pointStyle: 'circle',
                  showLine: 'true'
              },
            ]
          },
          options: {
              animation: {
                duration: 4000,
                easing: 'easeInOutElastic',
              },
              chartArea: {
                backgroundColor: 'rgba(0, 151, 167, 0.2)'
              },
              responsive: true,
              title: {
                    display: true,
                    text: 'Your Performance',
                    position: 'top',
                    fontFamily: 'MulishRegular',
                    fontColor: '#faf9f9',
                    fontSize: 30,
                },
              legend: {
                  display: false
              },
                layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                  }
              },
              tooltips: {
                mode: 'label',
                titleFontSize: 20,
                bodyFontSize: 18
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                  hover: {
                    animationDuration: 100 // duration of animations when hovering an item
                  },
                  xAxes: [{
                    gridLines: {
                      display: true,
                      color: 'rgb(191, 255, 244)',
                      lineWidth: 0.2,
                    },
                    ticks: {
                      fontColor: 'rgb(191, 255, 244)',
                      fontSize: 20,
                  }
                  }],
                  yAxes: [{
                      gridLines: {
                        display: true,
                        color: 'rgb(191, 255, 244)',
                        lineWidth: 0.2,
                      },
                      ticks: {
                          beginAtZero: true,
                          stepSize: 5,
                          suggestedMax: 100,
                          fontColor: 'rgb(191, 255, 244)',
                          fontSize: 20,
                      }
                  }]
              }
            }
          });
        }, 500);
    }
  }

  toggleLeaderboard() {
    if (this.isLeaderboard === true) {
      this.isPerformance = false;
    } 
    else if (this.isLeaderboard === false) {
      this.isLeaderboard = true;
      this.isAttendence = false;
      this.isPerformance = false;
    }
  }

  fetchDashboardActivityData(){
    this.studentService.fetchDashboardActivity().subscribe(res => {
      this.dashboardActivityData = res;
    });
  }
  fetchStudentDetails() {
    // this.isLoading = true;
    this.studentService.fetchStudentDetails().subscribe(res => {
      // this.isLoading = false;
      this.studentDataList = res;
      this.userName = res.first_name;
      this.userEmail = res.email;

      StorageService.setItem('class_id',this.studentDataList.student_class.id);
      if (this.studentDataList.courses.length) {
        StorageService.setItem('subjectName',
      
        this.studentDataList.courses.subject.subject_name);
      }
 
      StorageService.setItem('schoolName',this.studentDataList.school);
      // this.studentData=res;
      this.getTodayClassData();

      if (res.first_login) {
   alert(`Hi ${res.first_name}, Welcome to VAM`);
      }
    });
  }
  getTodayClassData(){
    this.studentService.fetchClassTodayData().subscribe(res => {
      this.todayClassData = res;
    });
  }


  getData(){
    // if (Object.keys(this.studentDataList.courses).length) {
    //   this.studentService.fetchZoomIdPassword(this.studentDataList.courses.id).subscribe(res=>{
    //     this.hideJoinBtn = false
    //     this.getSignature(res.course.meeting_id, res.course.meeting_password)
    //   })
    // } else {
    //   alert('class not start');
    // }
    this.getSignature(this.studentDataList.student_class.meeting_id, this.studentDataList.student_class.meeting_password)

  }

  getStartTime(time) {
    return (time.substring(0,5) + " Hrs");
  }
  
  getSignature(id, pass) {

    this.signature = ZoomMtg.generateSignature({
      meetingNumber: id,
      apiKey: this.apiKey,
      apiSecret: 'TeOVSOTTEyzK2RuQ2eFI7pctZet0YHiKJxxf',
      role: '0',
      success: (res) => {
        console.log(res.result);
        this.startMeeting(res.result, id, pass)
      }
    });
  }

  startMeeting(signature, meetingNumber, passWord){
    console.log("Signature = "+signature)
    document.getElementById('zmmtg-root').style.display = 'block';
    document.getElementById('stu-dashboard-id').style.display = 'none';
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      // loginWindow: {  // optional,
      //   width: '400',
      //   height: '380'
      // },
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
 
}
