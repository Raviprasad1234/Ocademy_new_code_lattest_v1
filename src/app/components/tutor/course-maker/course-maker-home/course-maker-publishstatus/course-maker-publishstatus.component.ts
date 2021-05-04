import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';

@Component({
  selector: 'app-course-maker-publishstatus',
  templateUrl: './course-maker-publishstatus.component.html',
  styleUrls: ['./course-maker-publishstatus.component.css']
})
export class CourseMakerPublishstatusComponent implements OnInit {

  // constructor(private router:Router, private activatedRoute:ActivatedRoute) { }
  cid = '';
  publishStatusVal: any = "Un Publish";
  isbtnunpublished = false;
  isbtnunpublish = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private hmservice: CourseMakerHomeService,
    private tstr: ToastrService,
    private Authservice : AuthService,
    private tutorservice: TutorServiceService,
    private spinner: NgxSpinnerService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.cid = this.router.getCurrentNavigation().extras.state['course_id']
    } else {
      this.goback()
    }
  }

  ngOnInit(): void {
    this.getCourseByCourseIdMethod();
  }

  goback() {
    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    // this.router.navigateByUrl('coursemaker');
  }

  isCourseisApproved = false;

  getCourseByCourseIdMethod() {
    var courseId = this.cid;
    this.spinner.show();
    this.tutorservice.getCourseByCourseIdService(courseId).subscribe((response) => {
      if (response) {
        if (response['status'] == 200) {
          setTimeout(() => {this.spinner.hide();}, 500);
          var course_data = response['data'];
          var course_list = course_data['course'];
          this.publishStatusVal = course_list['publishStatus'];
          if (this.publishStatusVal == 'Waiting For Approval') {
            this.isbtnunpublished = true;
            this.isbtnunpublish = false;
          } else if (this.publishStatusVal == 'Approved') {
            this.isbtnunpublished = true;
            this.isbtnunpublish = false;
            this.isCourseisApproved = true;
          } else {
            this.isbtnunpublished = false;
            this.isbtnunpublish = true;
          }
        }
      }
    }, (error) => {
      this.spinner.hide();
      if (error.status === 500) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.tstr.warning("Please Access with valid Token",'', {timeOut: 1000});
        this.Authservice.invalidtokenAccress();
     }  else if (error.status == 404) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.tstr.error(error.error.message, '', { timeOut: 1000 });
      }
        });
  }




  publishStatusMethod() {
    var courseId = this.cid;
    var sdata = '';
    this.tutorservice.getCourseByCourseIdService(courseId).subscribe((response)=>{

      if(response['status'] == 200){


        var data = response['data'];
        console.log(data);


        var tutor_course = data['course'];
        // if(tutor_course['shortDescription'] != undefined && tutor_course['shortDescription'] != '' && tutor_course['shortDescription'] != null){
        //   var requirments_text = tutor_course['shortDescription'];
        // }
        // if(tutor_course['description'] != undefined && tutor_course['description'] != '' && tutor_course['description'] != null){
        //   var LongDescription_text = tutor_course['description'];
        // }


    
        if(tutor_course['shortDescription'] != undefined && tutor_course['shortDescription'] != '' && tutor_course['shortDescription'] != null && tutor_course['description'] != undefined && tutor_course['description'] != '' && tutor_course['description'] != null){

            this.tutorservice.courseSendForApprovalService(courseId, sdata).subscribe((res) => {
            this.tstr.success('Course send For Approval is Done..!');
            this.getCourseByCourseIdMethod();
            // this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
          }, (error) => {
            this.tstr.error('please Try Again..!');
          });         

        } else{
          this.isbtnunpublished = false;
          this.isbtnunpublish = true;
    
          console.log(this.isbtnunpublished);

          this.tstr.warning('Please add Description and Requirment to the course');
        }
        // console.log(requirments_text );


        // console.log(LongDescription_text );
        


        // if(requirments_text == '' &&  LongDescription_text == ''){
            // this.tstr.warning('please add Description and Requirment to the course');

        // } else{
          // this.tutorservice.courseSendForApprovalService(courseId, sdata).subscribe((res) => {
          //   this.tstr.success('Course send For Approval is Done..!');
          //   this.getCourseByCourseIdMethod();
          //   // this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
          // }, (error) => {
          //   this.tstr.error('please Try Again..!');
          // });  
        // }

       


    }


    },(error)=>{
      console.log(error);
    })

  
debugger;

  }

  UnonpublishMethod(event) {
    if (event.target.value == 'on') {
      this.publishStatusVal = "Un Publish";
    }
  }
  onpublishMethod(event) {
    console.log(event);

    console.log(event.target);
    console.log(event.target.value);


    this.publishStatusMethod();
    if ( event.target.checked ) {
      this.isbtnunpublished = true;
 } 
  }
}
