import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student/student.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-body-part',
  templateUrl: './body-part.component.html',
  styleUrls: ['./body-part.component.css']
})
export class BodyPartComponent implements OnInit {



  constructor(   private  studentservice : StudentService, 
    private authservice : AuthService,
    private toastr: ToastrService, private route: Router) { }

ngOnInit(): void {
  // this. getOnecourse(); 
}
shortAddSweetCoursesConfig: SwiperOptions = {
  spaceBetween: 10,
  pagination: { el: '.swiper-pagination', clickable: true },
  autoHeight: true,
  allowTouchMove: true,
  slidesPerView: 'auto',
  // autoplay: {
  //   delay: 6000,
  //   disableOnInteraction: false
  // },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      slidesPerGroup:4
    },
    500: {
      slidesPerView: 3,
      slidesPerGroup:3
    },
    400: {
      slidesPerView: 2,
      slidesPerGroup:2
    },
    300: {
      slidesPerView: 1,
      slidesPerGroup:1
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  loop: true
};
selectedLevel1Data: any;
firstCourse: any;
All_ratings: any;
Avg_Rating: any;
all_Data : any= [];
showemptyCourses = false;
removeOacademyUrl(data) {
  data.forEach(element => {
    if (element['fileUrl'])
      element['fileUrl'] = element['fileUrl'].split('oacademy/').join('')
  });
  return data
}

gotocart(id, val) {
  this.route.navigate(['/gotocart', { cid: id, courseTitle: val }]);
};

removeCoverImageOacademyUrl(data) {
  data.forEach(element => {
    if (element['coverImageUrl'])
      element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
  });
  return data
}
getOnecourse() {
  this.firstCourse = [];
  this.All_ratings = [];
  var userid = sessionStorage.getItem('uid');
  this.studentservice.getAllCoursesService().subscribe((response) => {
    if (response['status'] == 200) {
      // courseList
      var course_List = response['data'];
      this.selectedLevel1Data = this.removeOacademyUrl(course_List['courseList']);
      this.all_Data = this.removeCoverImageOacademyUrl(this.selectedLevel1Data);
      this.firstCourse =this.all_Data.reverse()
      // this.firstCourse = this.removeCoverImageOacademyUrl(this.selectedLevel1Data);        
      for (var i = 0; i <= this.firstCourse.length - 1; i++) {
        for (var j = 0; j <= this.firstCourse[i].rating.length-1; j++) {
          if(this.firstCourse.id == this.firstCourse[i].rating.course_id){
            this.All_ratings = (this.firstCourse[i].rating);
            var avg = this.All_ratings.reduce((a, {ratingType}) => a + ratingType, 0) / this.All_ratings.length;
            this.firstCourse[i].rat = avg;
          }
        }
      }
      if (this.selectedLevel1Data.length == 0) {
        this.showemptyCourses = true;
      } else {
        this.showemptyCourses = false;
      }
    }
  }, (error) => {

    if (error.status === 500) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    }  else if (error.status === 400) {
     this.toastr.error(error.error.message,'', {timeOut: 1000});
  }  else if (error.status === 401) {
    this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
    this.authservice.invalidtokenAccress();
 } 
   else if(error.status == 404){
     this.toastr.error(error.error.message,'', {timeOut: 1000});
  }else if (error.status === 409) {
     this.toastr.error(error.error.message,'', {timeOut: 1000});
  }else if (error.status === 406) {
    this.toastr.error(error.error.message,'', {timeOut: 1000});
  } 
  // else{
  //   this.toastr.error(error.error.message,'', {timeOut: 1000});
  // }
  });
}



}
