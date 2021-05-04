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
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private studentservice: StudentService,
    private category_service: CategoriesService,
    private route: Router,
    private Authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toster: ToastrService) {
  }
  cp: number = 1
  wishlistsearch = "";
  searchformyLearning: any
  courseListDataArr: any;
  getAllStudentCoursesDataArr: any;
  checkUserID: any;
  whichAreinWishList: any;
  showArchivedData = false;
  myLearningObj: any = {};

  skeletonBoolen = true;
  learningdataLoaded = false;

  ngOnInit(): void {
    this.shareCourse();
    //this.restrictInspect();
    this.getPurchasedStudentCourses();
    // $(".infopoint").popover(this.options);
  }

  showDotsData = false
  showDotsMethod(index, data) {
    for (var i = 0; i <= this.getAllStudentCoursesDataArr.length - 1; i++) {
      if (this.getAllStudentCoursesDataArr[i].courseTitle == data.courseTitle) {
        this.getAllStudentCoursesDataArr[i].showsharediv = !this.getAllStudentCoursesDataArr[i].showsharediv
      } else {
        this.getAllStudentCoursesDataArr[i].showsharediv = false;
      }
    }
  }

  showArchivedDataMethod() {
    this.showArchivedData = !this.showArchivedData;
  }

  onSubmitMyLearningMethod() {
  }

  changesortBy(event) {
  }


  removeOacademyUrlForCoverImage(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });
    return data
  }







  getPurchasedStudentCourses() {
    var userid = sessionStorage.getItem('uid');
    this.spinner.show();
    this.skeletonBoolen = true;
    this.learningdataLoaded = false;

    this.studentservice.getStudentPurchasedCourses(userid).subscribe((response) => {

      console.log(response, "resp");

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        if (response['status'] == 200) {
            this.skeletonBoolen = false;
            this.learningdataLoaded = true;
          var course_list_data = response['data'];
          var course_list = course_list_data['courseList'];

          if(course_list.length == 0 || course_list == []){
            this.getAllStudentCoursesDataArr = [];
          } else{
            this.getAllStudentCoursesDataArr = this.removeOacademyUrlForCoverImage(course_list);
            this.checkUserID = this.getAllStudentCoursesDataArr[0].user_id;
            this.getWishListMethod(this.checkUserID);      
          }

       

        }
      }
    }, (error) => {
      this.skeletonBoolen = true;
      this.learningdataLoaded = false;
      setTimeout(() => { this.spinner.hide(); }, 500);
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
    });
  }


  AddToWishListMethod(wish) {
    var userId = wish['user_id'];
    var uid = sessionStorage.getItem('uid');
    var wishListObj = { "wishList": [wish['id']] };


    this.studentservice.AddWishlistService(uid, wishListObj).subscribe((res) => {
      this.toster.success('course Added in WishList..!');
      // this.tos 
    }, (error) => {
      console.log(error);
    })
  }


  getAllpurchaseCourses() {
    var userid = sessionStorage.getItem('uid');
    return this.studentservice.getStudentPurchasedCourses(userid).toPromise();
  }

  getwishlistCourses() {
    var uid = sessionStorage.getItem('uid');
    return this.studentservice.getWishListService(uid).toPromise();
  }



  async ngAfterViewInit() {
    var response = await this.getAllpurchaseCourses();//
    if (response['status'] == 200) {
      var value = await this.getwishlistCourses();
    }
  }



  getwishListArr: any;


  ReloadWishListMethod() {
    this.getWishListMethod(this.checkUserID);
    this.getAllCoursesDataMethod();
  }

  getAllCoursesDataMethod() {
  }


  AddwishlistDataArr: any;


  getWishListMethod(user_id) {
    this.AddwishlistDataArr = [];
    var uid = sessionStorage.getItem('uid');
    // var userID = this.checkUserID;
    this.studentservice.getWishListService(uid).subscribe((response) => {

      if (response) {
        if (response['status'] == 200) {
          var cart_course_data = response['data'];
          var wishlist_courses = cart_course_data['wishlistcourses']
          // var cart_course_lsit = cart_course_data['courses'];
          // var updated_wish_list = cart_course_data['updatedUser'];
          this.getwishListArr = this.removeOacademyUrlForCoverImage(wishlist_courses);
          this.whichAreinWishList = wishlist_courses;
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


  innerviewpage(id, val) {
    this.route.navigate(['student/details', { sid: id, courseTitle: val }]);
    // this.route.navigate(['student/details'], { state: { sid: id, courseTitle: val } });
  }


  addtocartviewpage(id, courseTitle, category, subCategory, topic) {
    this.route.navigate(['/gotocart', {
      cid: id, courseTitle: courseTitle,
      cat: category, subcat: subCategory, subsubcat: topic
    }]);
  }




  // GET /ocademy/student/myPurchasedCourses/{userId}




  options = {
    placement: function (context, source) {
      var position = $(source).position();

      if (position.left > 515) {
        return "left";
      }

      if (position.left < 515) {
        return "right";
      }

      if (position.top < 110) {
        return "bottom";
      }

      return "top";
    }
    , trigger: "click"
  }


  shareUrl = '';
  windowloc: any;
  navUrl = '';
  course_id = '';
  course_title = '';

  shareCourse() {
    this.windowloc = window.location.origin;
    this.shareUrl = `${this.windowloc + '/' + 'gotocart;' + 'cid=' + this.course_id + ';' + 'courseTitle=' + this.course_title + ';'}`
  }

  openShareCourse(title, id) {
    this.course_title = title;
    this.course_id = id;
    this.openModal('openshareModal');
    this.shareCourse()
  }

  // openShareCourse() {
  //   this.openModal('openshareModal');
  // }
  openModal(content) {
    $('#' + content).modal('show');
  }

  closeModal(content) {
    $('#' + content).modal('hide')
  }
  closeShareAlertIcon() {
    document.getElementById('openshareModal').click();
  }
  openShare(Val) {
    let searchParams = new URLSearchParams();
    // this.shareUrl = this.firstlessonvideo;
    switch (Val) {
      case "facebook":
        searchParams.set("", this.shareUrl);
        this.navUrl =
          "https://www.facebook.com/sharer/sharer.php?" + searchParams;
        break;
      case "twitter":
        searchParams.set('', this.shareUrl);
        this.navUrl = "https://twitter.com/share?" + searchParams;
        break;
      case "whatsapp":
        searchParams.set('', this.shareUrl);
        this.navUrl = "https://wa.me/send?text" + searchParams;
        break;
    }
    window.open(this.navUrl, "_blank");
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
