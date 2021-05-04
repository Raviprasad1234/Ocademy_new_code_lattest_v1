import { Component, OnInit } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student/student.service';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-student-wishlist',
  templateUrl: './student-wishlist.component.html',
  styleUrls: ['./student-wishlist.component.css']
})
export class StudentWishlistComponent implements OnInit {
  constructor(private studentservice: StudentService,
    private category_service: CategoriesService,
    private route: Router,
    private Authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toster: ToastrService) {
  }
  cp: number = 1
  courseListDataArr: any;
  StudentAllCoursesData: any;
  getAllStudentCoursesDataArr: any;
  checkUserID: any;
  showArchivedData = false;
  searchformyLearning = "";

  showCartbtnboolean = true;

  ngOnInit(): void {
    this.getWishListMethod(this.checkUserID);
    //this.restrictInspect();
  }
  removeOacademyUrlForCoverImage(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });
    return data
  }
  getwishListArr: any;
  AddwishlistDataArr: any;
  getWishListMethod(user_id) {
    this.AddwishlistDataArr = [];
    var uid = sessionStorage.getItem('uid');
    this.studentservice.getWishListService(uid).subscribe((response) => {
      if (response) {
        if (response['status'] == 200) {
          var cart_course_data = response['data'];
          var wishlist_courses = cart_course_data['wishlistcourses']
          this.getwishListArr = this.removeOacademyUrlForCoverImage(wishlist_courses);
        }
      }
    }, (error) => {
      this.spinner.hide();
      if (error.status === 500) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toster.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toster.error(error.error.message, '', { timeOut: 1000 });
      } 
    })
  }


  innerviewpage(id, courseTitle, category, subCategory, topic) {
    this.route.navigate(['/gotocart', {
      cid: id, courseTitle: courseTitle,
      cat: category, subcat: subCategory, subsubcat: topic
    }]);
  }


  // restrict to avoid F12

  restrictInspect() {
    // document.addEventListener("keydown", function(e) {
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        console.log('You cannot inspect Element');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        console.log('You cannot inspect Element');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        console.log('You cannot inspect Element');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        console.log('You cannot inspect Element');
        return false;
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        console.log('You cannot inspect Element');
        return false;
      }
    }
    // prevents right clicking
    document.addEventListener('contextmenu', e => e.preventDefault());

  }

  // end restrict to avoid F12

}
