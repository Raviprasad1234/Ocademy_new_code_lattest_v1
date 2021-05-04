import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';

declare var $: any;
@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  testLoginUser: any
  loginData: any;


  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  userName: any;
  userEmailID: any;

  showAllCat = [];
  showsubCat = [];
  showsubCategories = false;
  searchbycat_SubCat_topic_Name = '';
  searchDivBox: boolean = false;
  signUp = {};
  txtsearch: any;

  constructor(
    private formBuilder: FormBuilder,
    private Authservice: AuthService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private studentservice: StudentService,
    private rout: ActivatedRoute,
    private category_service: CategoriesService,
    private router: Router, private toastr: ToastrService) {
    fromEvent(document, 'click').subscribe((dt) => {
      this.searchDivBox = false;
    })
  }

  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  signUpForm: FormGroup;
  submitted = false;


  checkIsloogedIn: boolean;

  gettoken: any;

  showTab: boolean;

  hideTab: boolean
  searchheading: any;

  ngOnInit(): void {
    // this.checkIsloogedIn = this.Authservice.isloggedIn();
    // this.Get_All_Category();
    // this.getAllData();
    // this.gettingCatName();
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      password: ['', Validators.required],
    });


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.gettoken = sessionStorage.getItem('token');


    this.testLoginUser = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);

    if (this.gettoken == null || this.gettoken == '' || this.gettoken == undefined) {
      this.showTab = this.checkIsloogedIn;
      this.hideTab = !this.checkIsloogedIn;
    } else {
      this.showTab = this.checkIsloogedIn;
      this.hideTab = !this.checkIsloogedIn;

    }
  }


  get f() { return this.loginForm.controls; }

  get s() { return this.signUpForm.controls; }

  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";


  onSiginUpSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUp = {
      username: this.signUpForm.value['username'],
      email: this.signUpForm.value['email'],
      password: this.signUpForm.value['password'],
      role: ["student"]
    }


    this.Authservice.siginUp(this.signUp).subscribe((response: any) => {
      this.toastr.success(response.message, '', { timeOut: 1000 });
      // this.sendModal();
      this.signupclose()
      var signUpmessage = response;
      // this.toastr.success(signUpmessage);
    }, (error) => {
      this.toastr.error(error);
    });
  }
  // onSiginUpSubmit form ends 


  loginObj = {};

  onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginObj = {
      username: this.loginForm.value['username'],
      password: this.loginForm.value['password']
    };
    this.Authservice.logIn(this.loginObj).subscribe((res) => {
      // var signUpmessage = res; 
      // this.toastr.success(signUpmessage);
      if (res) {
        var key = 'token';
        var value = res['token'];
        if (value == undefined || value == null || value == '') {
          this.showTab = this.checkIsloogedIn;
          this.hideTab = !this.checkIsloogedIn;
          return;
        } else {
          sessionStorage.setItem(key, value);
          this.showTab = !this.checkIsloogedIn;
          this.hideTab = this.checkIsloogedIn;

        }
      }
    }, (error) => {
    });

    this.username = this.loginForm.value['username'];
    this.password = this.loginForm.value['password'];
    this.userName = this.username;
    this.userEmailID = ""
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, this.userName);

    // this.Authservice.authenticationService(this.username, this.password).subscribe(res=>{
    // }, (error)=>{
    // });

    // this.Authservice.authenticationService(this.username, this.password).subscribe((res) => {
    //   this.showTab = true;
    //   this.hideTab = false;
    //   this.userEmailID = ""
    //   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, this.userName);
    // }, (error)=>{
    //    this.toastr.error('Server Not respond');
    // });
    // this.showCoursesIcons();
    this.sendModal();
    this.testLoginUser = this.username;
    this.showUserDiv = false;
  }

  // for category dropdown

  get_all_dropdown_data: any;
  Get_All_Category() {
    this.category_service.getCategoriesFamily().subscribe((dt: any) => {
      this.get_all_dropdown_data = dt
    })
  }
  final_sub_dat: any = [];

  very_final_sub_dat: any = [];

  testVal = [];
  subsubtopics = [];
  subsubtcategoryData = [];
  gettingSubSubCat(eve) {
    for (var i = 0; i <= this.get_all_dropdown_data.length - 1; i++) {
      for (var j = 0; j <= this.get_all_dropdown_data[i].subcategories.length - 1; j++) {
        if (this.get_all_dropdown_data[i].subcategories[j].id == eve) {
          this.subsubtopics = this.get_all_dropdown_data[i].subcategories[j].topic;
        }

      }
    }
    this.final_sub_dat = eve.topic;
  }

  categorySearch() {
    if (this.txtsearch.length > 0) {
      this.searchDivBox = true;
    } else {
      this.searchDivBox = false;
    }

  }

  gotoTutor() {
    this.router.navigate(['/tutor'])
    // .then(() => {
    //   window.location.reload();
    // });
  }

  mylearning() {
    this.router.navigateByUrl('/student/studentlearning');
  }


  studentallcourse() {
    this.router.navigateByUrl('/student/studentlearning');
  }


  myOnlineClasses() {
    this.router.navigateByUrl('/student/studentonlineclass');
  }

  paymentMethod() {
    this.router.navigate(['/student/studentlearning'], { relativeTo: this.rout });
    // this.router.navigate(['/student/paymentmethod'], {relativeTo: this.rout})
    // this.router.navigate(['/student/paymentmethod']);
  };

  gotohome() {
    this.router.navigate(['/student']);
  }

  mycart() {
    this.router.navigateByUrl('/student/mycart');
  }

  gotoLogOut() {
    // this.router.navigate(['/home']);

    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.gettoken);
    sessionStorage.clear();
    sessionStorage.clear();
    // this.showTab = this.checkIsloogedIn;
    // this.hideTab = !this.checkIsloogedIn;

    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    this.showTab = false;
    this.hideTab = true;
  }

  gotoCateg(val) {
    this.router.navigate(['/globalsearch', { cateName: val }])
      .then(() => {
        window.location.reload();
      });
  }

  gotoStudent() {
    this.router.navigate(['/search'])
    // this.router.navigate(['/search']).then(() => {
    //   window.location.reload();
    // });
  }

  studentNotificationMethod() {
    this.router.navigate(['/student/studentNotification'])
  }

  purchasehist() {
    this.router.navigate(['/student/purchasehistory'])
  }

  gotoprofile() {
    this.router.navigate(['/student/editprofile']);
  }
  openNotificationpopUp = false;

  notificationPopup() {
    this.getAllNotifications();
    this.openNotificationpopUp = !this.openNotificationpopUp;
  }


  getNotify: any;

  getAllNotifications() {
    // this.studentservice.ShowNotificationServices().subscribe((res)=>{
    //   this.getNotify = res;     

    // }, (error)=>{
    //     console.log(error);
    // });
  }











  showUserDiv = false;
  showUserDivMethod() {
    this.showUserDiv = !this.showUserDiv;
  }



  showModal(): void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.modalclose();
  }
  // hideModal(): void {
  //   document.getElementById('closesigninmodal').click();
  // }

  modalclose() {
    document.getElementById('closesigninmodal').click();
  }


  signupclose() {
    document.getElementById('closesignupmodal').click();
  }


  // global search 	


  // global search  end	
  // for category dropdown	
  getAllData() {
    this.spinner.show();
    // setTimeout(() => {	
    //   this.spinner.hide();	
    // }, 3000);	
    this.category_service.getCategoriesFamily().subscribe(res => {
      this.showAllCat = res;
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();

    });
  }
  // mouseoutfun(){	
  //   this.showAllCatscls = false; 	
  // }	
  onovershowSubCat(catname) {
    this.searchbycat_SubCat_topic_Name = catname;
    this.showsubCat = [];
    // $(dropdown-content3)	
    this.showtopicCls = false;
    for (var i = 0; i <= this.showAllCat.length - 1; i++) {
      if (catname == this.showAllCat[i].categoryName) {
        for (var j = 0; j <= this.showAllCat[i].subcategories.length - 1; j++) {
          this.showsubCat.push(this.showAllCat[i].subcategories[j].subCategoriesName);
        }
      }
    }
  }
  showTopicsNames = [];
  showtopicCls: boolean;
  onoverSubCatshowTopics(subcat) {
    this.searchbycat_SubCat_topic_Name = subcat;
    this.showTopicsNames = [];
    for (var i = 0; i <= this.showAllCat.length - 1; i++) {
      for (var j = 0; j <= this.showAllCat[i].subcategories.length - 1; j++) {
        if (subcat == this.showAllCat[i].subcategories[j].subCategoriesName) {
          for (var k = 0; k <= this.showAllCat[i].subcategories[j].topic.length - 1; k++) {
            this.showtopicCls = true;
            this.showTopicsNames.push(this.showAllCat[i].subcategories[j].topic[k].topicName);
          }
        }
      }
    }
  }
  showAllCatscls = false;
  showAllCats() {
    this.showAllCatscls = !this.showAllCatscls;
    this.showtopicCls = false;
  }
  // end get All 

  CATEGORYNAMES = [];
  CATNAME = [];
  final = [];
  gettingCatName() {

    // this.category_service.getCategoriesFamily().subscribe((dt: any) => {
    //   this.CATEGORYNAMES = dt;
    //   this.CATNAME = [];


    this.category_service.getAllCourses().subscribe((dt: any) => {
      this.CATEGORYNAMES = dt;
      this.CATNAME = [];
      for (var i = 0; i <= this.CATEGORYNAMES.length - 1; i++) {
        this.CATNAME.push(this.CATEGORYNAMES[i].category);
        this.CATNAME.push(this.CATEGORYNAMES[i].topic);
        this.CATNAME.push(this.CATEGORYNAMES[i].subCategory);
        this.final = ([...new Set(this.CATNAME)]);
      }



      // for (var i = 0; i <= this.CATEGORYNAMES.length - 1; i++) {
      //   this.CATNAME.push(this.CATEGORYNAMES[i].categoryName);
      //   for (var j = 0; j <= this.CATEGORYNAMES[i].subcategories.length - 1; j++) {
      //     this.CATNAME.push(this.CATEGORYNAMES[i].subcategories[j].subCategoriesName)
      //     for (var kk = 0; kk <= this.CATEGORYNAMES[i].subcategories[j].topic.length - 1; kk++) {
      //       this.CATNAME.push(this.CATEGORYNAMES[i].subcategories[j].topic[kk].topicName);
      //       this.final=([...new Set(this.CATNAME)]);
      //     }
      //   }
      // }


    }, (error) => {
      if (error.status === 500) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.warning(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
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
  MOUSELEAVE() {
    this.showAllCatscls = false
  }
  mouseouthide() {
    this.openNotificationpopUp = false;
  }




}
