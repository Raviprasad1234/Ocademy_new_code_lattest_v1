import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/tutor/categories.service';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authservice: AuthService,
    private category_service: CategoriesService,
    private adminservice: AdminService) { }

  val = 0;
  revenue = 0;
  studentsCnt = 0;
  topcourse = 0;
  ngOnInit(): void {
    this.getAllCoursesMethod();
    // this.noOfstudentMethod();
    // this.noOfTutorsMethod();
    // setInterval(() => {
    //   this.myCount();
    //   this.revenueCount();
    //   this.stundets()
    // }, 0);
  }
  count = 456;
  rcount = 111456;
  scount = 5426;
  myCount() {
    if (this.count > 456) {
      return false
    }
    this.val = this.count;
    this.count++;
  }
  revenueCount() {
    if (this.rcount > 111456) {
      return false
    }
    this.revenue = this.rcount;
    this.rcount++;
  }

  stundets() {
    if (this.scount > 5426) {
      return false
    }
    this.studentsCnt = this.scount;
    this.scount++;
  }


  NoOfstudents: any;
  NoOfTutors: any;
  noOfstudentMethod() {
    this.adminservice.getCountByroleNameStudent().subscribe((res) => {
      this.NoOfstudents = res;
    }, (error) => {
      this.toastr.error('Server Not respond', '', { timeOut: 1000 });
    });
  }

  NoOfCourses: any;


  noOfTutorsMethod() {
    this.adminservice.getCountByroleNameTutor().subscribe((res) => {
      this.NoOfTutors = res;
    }, (error) => {
      this.toastr.error('Server Not respond', '', { timeOut: 1000 });
    });

  }

  getAllCoursesMethod() {
    this.category_service.getAllCourses().subscribe((response: any) => {
      if (response) {
        if (response['status'] == 200) {
          var course_data = response['data'];
          var course_list = course_data['courseList'];

          if(course_list.length == 0 || course_list == []){
            
          } else{
            var course_list_length = course_list.length;
            this.NoOfCourses = course_list_length;
          }

       
       
        }
      }
    }, (error) => {
      if (error.status === 500) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      }
    });
  }



}
