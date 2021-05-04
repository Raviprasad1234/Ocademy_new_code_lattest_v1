import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener, Inject } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservableService } from 'src/app/services/common/Observable-service';
import { StudentService } from 'src/app/services/student/student.service';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';
import { GlobalHeaderComponent } from '../global-header/global-header.component';
// import { $ } from 'protractor';

import { StarRatingComponent } from 'ng-starrating';


declare var $: any;
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit, OnChanges {
  userCouponRequest: any;

  videosrc: any = '';
  course_id: any;
  course_title: any;
  AllCoursesData = [];
  data;
  data1;
  activeIndex = 0;
  shareUrl = '';
  navUrl = '';
  windowloc: any;
  isValid = true;
  productValue: number = 1999;
  couponnValue: any = [];
  show = false;
  showmore = false;
  instshowmore = false;
  CAT: any;
  SUBCAT: any;
  SUBSUBCAT: any;
  SearchedCategoryName: any;
  SearchedSubCategoryName: any;
  SearchedSubSubCategoryName: any;
  // filteredCouponNaME
  couponCodeeeee: any = [];
  // filteredCouponNaME
  CouponSuccessDiv = false;
  allCouponDetails = [];
  finalObject = [];
  filterResult: any = []
  priceDetails: any = [];
  checkpDFview: any;
  public href: any = "";
  appliedCouponAmount: any = 0;
  getCartTotalPrice = 0;
  // course_price
  showDelprice = false;
  Delprice
  checkupdateCoupon: any = [];
  course_Title: any;
  course_topic: any;
  createdAt: any;
  course_createdBy: any;
  course_language: any;
  course_level: any
  course_price: any;
  loadingVideobasedonlessonOne: any;
  firstlessonvideo: any;
  oneCourse_List_Data: any = [];
  firstpdfviewer: any;
  checkVideoID: any;
  openContentVideo: any = '';
  isPdfLessonView = false;
  isVideoLessonView = false;
  videoID: any = "";
  videovalcheck: any = false;
  playpausechecked = false;
  CartData: any;
  showCartbtnboolean = true;
  openLoginPage = "test";
  cartlist: any;
  cartlength: any;
  courseAddedinwishlist = false;
  disablethewishlistbutton = false;
  totalPages: number;
  page: number = 1;
  isLoaded: boolean = false;

  Course_description: any;
  Course_shortDescription: any;
  totalstar = 5;
  All_ratings: any;
  constructor(
    private router: ActivatedRoute, private formBuilder: FormBuilder,
    private route: Router,
    private homerouter: Router, private CoursemakerHomeservice: CourseMakerHomeService,
    private spinner: NgxSpinnerService, private service: AdminService,
    private tostr: ToastrService,
    private Authservice: AuthService,
    private Studentservice: StudentService,
    private observableservice: ObservableService
  ) {
    this.router.params.subscribe((params: Params) => {
      this.course_id = params.cid;
      this.course_title = params.courseTitle;
      this.CAT = params.cat;
      this.SUBCAT = params.subcat;
      this.SUBSUBCAT = params.subsubcat;

      this.getAllCoursesBycourseID();
    });
  }


  // @Input() parentCount:number;
  // @Output() valueChange = new EventEmitter();
  // counter = 0;

  ngOnInit() {
    //this.restrictInspect();
    var elmnt = document.getElementById("main");
    elmnt.scrollIntoView();

    this.href = this.router.url;

    this.shareCourse();
    this.getCartLength();
    this.testmethod();
    this.getAllCouponsMethod();
    this.hideCouponMethod();
  }

  couponsDIV: boolean;
  hideCouponMethod() {
    var token = sessionStorage.getItem('token');
    if (token == null || token == undefined || token == '') {
      this.couponsDIV = false
    } else {
      this.couponsDIV = true;
    }
  }

  getAllCouponsMethod() {
    this.service.getAllCoupons().subscribe((response: any) => {

      if (response['status'] == 200) {
        var coupons_Data = response['data'];
        var Coupons_list = coupons_Data['allCuponsList']
        this.couponnValue = Coupons_list;
        this.allCouponDetails = Coupons_list;
      }
    }, (error) => {
      if (error.status === 500) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 502) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 504) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      }
    });
  }



  applyingCoupon(data) {
    this.checkupdateCoupon = [];

    var token = sessionStorage.getItem('token');
    if (token == undefined || token == null || token == '') {
      this.route.navigate(['/home']);
      return;
    }
    if (data == undefined || data == '') {
      this.tostr.warning('Please enter coupon code.');
      return;
    } else {
      this.filterResult = this.allCouponDetails.filter(u =>
        u.couponCode == data
      );
    }
    if (this.filterResult == undefined || this.filterResult == [] || this.filterResult.length == 0) {
      this.tostr.warning('Invalid Coupon Code ..!');
    } else {
      var filterd_CouponID = this.filterResult[0].id;
      this.Studentservice.checkCouponisActiveorNotService(filterd_CouponID).subscribe((response) => {
        var data = response['data'];
        var getAllcouponsData = data['coupon'];
        if (getAllcouponsData['status'] == 'Inactive') {
          this.tostr.warning('Please enter valid coupon code.');
          return;
        } else if (getAllcouponsData['status'] == 'Active') {
          this.appliedCouponAmount = getAllcouponsData['couponAmount'];
          if (this.appliedCouponAmount > this.course_price) {
            this.tostr.warning('Please apply valid coupon');
            return;
          }
          this.course_price = (this.course_price - this.appliedCouponAmount);
          this.CouponSuccessDiv = true;
          this.isValid = false;
          this.tostr.success(' Coupon Applied ');
          this.showDelprice = true;
          return;
        }
      }, (error) => {
      })
    }
    //   if(this.filterResult == undefined || this.filterResult==[] || this.filterResult.length == 0 ){
    //    this.tostr.warning('Invalid Coupon Code ..!');
    //   } else{
    //    for(var i = 0;i<=this.allCouponDetails.length;i++){  
    //     if(this.allCouponDetails[i].couponCode == this.userCouponRequest  &&  this.allCouponDetails[i].status == "Active" ){
    //       this.appliedCouponAmount = this.allCouponDetails[i].couponAmount;

    //       if(  this.appliedCouponAmount  >   this.course_price ){
    //         this.tostr.warning('please apply valid coupon');
    //         return;
    //        }

    //       this.course_price =  (this.course_price - this.appliedCouponAmount);
    //       this.CouponSuccessDiv=true;
    //       this.isValid = false; 
    //       this.tostr.success(' Coupon Applied ');
    //       this.showDelprice = true;
    //        return;
    //     }else if(this.allCouponDetails[i].couponCode == this.userCouponRequest &&  this.allCouponDetails[i].status == "Inactive"){
    //       this.tostr.warning('please enter valid coupon code ..!');
    //   }
    //   }
    // }

  }



  RemoveCoupon() {
    this.isValid = true;
    this.userCouponRequest = '';
    this.CouponSuccessDiv = false;
    // this.productValue = 1999;
    this.getAllCoursesBycourseID();
    this.showDelprice = false;
  }

  openShareCourse() {
    this.openModal('openshareModal');
  }


  openModal(content) {
    $('#' + content).modal('show');
  }

  closeModal(content) {
    $('#' + content).modal('hide')
  }

  closeModalvideo() {
    $('#myModal').modal('hide')
    window.location.reload();
    // $('.modal-body  video').attr('src', '');
    this.resetmodalvideo();
  }


  resetmodalvideo() {
    this.checkVideoID.pause();
  }


  closeSectionModal(lessonID) {
    $('#myModal' + lessonID).modal('hide');
    this.resetSectionsmodalvideoMethod();
    // window.location.reload();
    // $(".modal-body").html("");
    //  $('.modal-body  video').attr('src', '');
    // this.ngOnInit();

    // $('#myModal'+ lessonID).removeData();
  }


  resetSectionsmodalvideoMethod() {
    window.location.reload();
  }


  shareCourse() {
    this.windowloc = window.location.origin;
    this.shareUrl = `${this.windowloc + '/' + 'gotocart;' + 'cid=' + this.course_id + ';' + 'courseTitle=' + this.course_title + ';'}`
  }
  openShare(Val) {
    let searchParams = new URLSearchParams();
    // this.shareUrl = this.firstlessonvideo;
    switch (Val) {
      case "facebook":
        searchParams.set("", this.shareUrl);
        this.navUrl = "https://www.facebook.com/sharer/sharer.php?u" + searchParams;
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

  videoPlayerInit(data) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  videoPlayerInit1(data1) {
    this.data1 = data1;
    // this.data1.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo1.bind(this));
    // this.data1.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;
  }
  initVdo() {
    this.data.pause();
  }

  initVdo1() {
  }

  removeOacademyUrl(data) {
    data = data.split('oacademy/').join('')
    return data
  }

  showDescriptionboolen = true;

  showRequirementsboolen = true;


  Av_Course_Rating : any;

  total_rating_length : any;

  getAllCoursesBycourseID() {
    this.All_ratings = [];

    this.spinner.show();
    this.AllCoursesData = [];
    this.oneCourse_List_Data = [];
    this.CoursemakerHomeservice.getAllCoursesLessonsBasedOnCourseID(this.course_id).subscribe(response => {
      if (response['status'] == 200) {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        var course_data = response['data'];
        var one_course_data_list = course_data['course'];
        var course_list_data = course_data['courseList'];


        console.log(course_data , "course_data");

        console.log(one_course_data_list, "one_course_data_list1212");

        this.oneCourse_List_Data.push(one_course_data_list);

        var token_val = sessionStorage.getItem('token');

        for (var i = 0; i <= this.oneCourse_List_Data.length - 1; i++) {


          for (var j = 0; j <= this.oneCourse_List_Data[i].sections.length - 1; j++) {
            for (var k = 0; k <= this.oneCourse_List_Data[i].sections[j].lessions.length - 1; k++) {

              if (token_val != null || token_val != undefined) {
                this.oneCourse_List_Data[i].sections[j].lessions[k].isPreview = "show";
              } else {

                this.oneCourse_List_Data[i].sections[0].lessions[0].isPreview = "show";
                this.oneCourse_List_Data[i].sections[j].lessions[k].isPreview = "hide";
                // token_val
              }
            }
          }
        }

        this.AllCoursesData = course_list_data;

        console.log(this.oneCourse_List_Data , "all rating ...");



        
        for (var i = 0; i <= this.oneCourse_List_Data.length - 1; i++) {




          for (var j = 0; j <= this.oneCourse_List_Data[i].rating.length - 1; j++) {
              if(this.oneCourse_List_Data[i].rating == null || this.oneCourse_List_Data[i].rating == [] || this.oneCourse_List_Data[i].rating == undefined){

              } else {
            if (this.oneCourse_List_Data.id == this.oneCourse_List_Data[i].rating.course_id) {
              this.All_ratings = (this.oneCourse_List_Data[i].rating);
              var avg = this.All_ratings.reduce((a, { ratingType }) => a + ratingType, 0) / this.All_ratings.length;
              this.oneCourse_List_Data[i].Avg_rating = avg;
            }
          
          }
          }

        }



        console.log(this.oneCourse_List_Data , "oneCourse_Listasdas_Data");


         this.Course_description  =  one_course_data_list['description'];

         this.Course_shortDescription = one_course_data_list['shortDescription'];


        if(this.Course_description == null || this.Course_description== ''){
          this.showDescriptionboolen = false;
        }else{
          this.showDescriptionboolen =  true;     
        }


        if(this.Course_shortDescription == null || this.Course_shortDescription == ''){
          this.showRequirementsboolen = false;
        } else{
          this.showRequirementsboolen = true;
        }


        if(this.oneCourse_List_Data[0]['Avg_rating'] == undefined || this.oneCourse_List_Data[0]['Avg_rating'] == null){
          this.Av_Course_Rating = 0;
        } else{
          this.Av_Course_Rating = (this.oneCourse_List_Data[0]['Avg_rating']).toFixed(2)

        }







        console.log(this.Av_Course_Rating , "Av_Course_Rating")

        this.total_rating_length =  one_course_data_list['rating'].length;

        console.log(this.total_rating_length , "this.total_rating_length")

        this.course_Title = one_course_data_list['courseTitle'];
        this.course_topic = one_course_data_list['topic'];
        this.createdAt = new Date(one_course_data_list['createdAt']);
        this.course_createdBy = one_course_data_list['createdBy'];
        this.course_language = one_course_data_list['language'];
        this.course_level = one_course_data_list['level'];
        this.course_price = one_course_data_list['price'];
        this.Delprice = this.course_price;
        this.SearchedCategoryName = one_course_data_list['category'];
        this.SearchedSubCategoryName = one_course_data_list['subCategory'];
        this.SearchedSubSubCategoryName = one_course_data_list['topic'];
        for (var i = 0; i <= one_course_data_list['sections'].length - 1; i++) {
          for (var j = 0; j <= one_course_data_list['sections'][i].lessions.length - 1; j++) {


            var fileName = one_course_data_list['sections'][0].lessions[0].fileName;

            var afterDot = fileName.substr(fileName.indexOf('.'));

            if (afterDot == '.pdf') {

              this.loadingVideobasedonlessonOne = one_course_data_list['sections'][0].lessions[0].fileUrl
              this.firstpdfviewer = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);

              this.isPdfLessonView = true;
              this.isVideoLessonView = false;
            } else if (afterDot == '.mp4') {
              this.isPdfLessonView = false;
              this.isVideoLessonView = true;
              this.loadingVideobasedonlessonOne = one_course_data_list['sections'][0].lessions[0].fileUrl
              this.firstlessonvideo = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);

              // $('.modal-body  video').attr('src', this.firstlessonvideo);
            } else {
              this.loadingVideobasedonlessonOne = one_course_data_list['sections'][0].lessions[0].fileUrl
              this.firstlessonvideo = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);

            }

            // 
          }
        }




        //   for(var i = 0 ; i<=this.AllCoursesData['sections'].length-1;i++){
        //     for(var j= 0 ; j <= this.AllCoursesData['sections'][i].lessions.length-1;j++ ){
        //        this.loadingVideobasedonlessonOne = this.AllCoursesData['sections'][i].lessions[0].fileUrl
        //        this.firstlessonvideo = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);
        //       //   
        //     }
        // }
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (error.status === 500) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      }
    })
  }


  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }




  openCourseContentVideoModalPlayer(dat, i) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.openContentVideo = '';
    var url = dat['fileUrl'] || ''
    var fileName = dat['fileName'];
    var afterDot = fileName.substr(fileName.indexOf('.'));
    if (afterDot == '.pdf') {
      $('#myModal' + i).modal('show');
      var RemoveVideoURl = this.removeOacademyUrl(url);
      this.checkpDFview = RemoveVideoURl;
      this.isPdfLessonView = true;
      this.isVideoLessonView = false;
    } else {
      $('#myModal' + i).modal('show');
      var RemoveVideoURl = this.removeOacademyUrl(url);
      this.openContentVideo = RemoveVideoURl;

      // $('.modal-body  video').attr('src', this.openContentVideo);
      this.isPdfLessonView = false;
      this.isVideoLessonView = true;
    }
    // $("#loadIframe" + i).attr('src', RemoveVideoURl);
  }


  ngOnChanges() {
    // console.log("test changes!!!");
  }



  SearchByCatNameMethod(catname) {
    this.route.navigate(['/globalsearch', { cateName: catname }])
  };

  SearchBySubCatNameMethod(subCatName) {
    this.route.navigate(['/globalsearch', { cateName: subCatName }])
  };

  SearchByTopicNameMethod(topicName) {
    this.route.navigate(['/globalsearch', { cateName: topicName }])
  };

  checkVideoPlayer() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    $('#myModal').modal('show');
  }

  playpausecheckedvideo = false;

  openvideoControlsboolen = false;

  // openvideoControls(event , demovideo){
  //   // alert(event.keyCode);
  //   // event.stopPropagation(); 
  //   var testdemovideo = "demovideo"
  //   this.openvideoControlsboolen = true;
  //   this.checkVideoID = document.getElementById("singleVideo");
  //   if( event.keyCode === 32  && this.openvideoControlsboolen == true && testdemovideo == demovideo){
  //       if(this.checkVideoID!==undefined){
  //         this.playpausecheckedvideo = !this.playpausecheckedvideo
  //       }
  //       if(this.playpausecheckedvideo){
  //         this.checkVideoID.play()
  //       }else{
  //         this.checkVideoID.pause();     
  //       }
  //     }

  // }



  // openSectionvideoControls(event , contentvideo){
  //   this.videovalcheck = true;
  //   this.videoID = document.getElementById("singleVideo1");
  //    var contervideocheck = "contentvideo"
  //   if(event.keyCode === 32 && this.videovalcheck == true && contervideocheck == contentvideo){
  //     if(this.videoID!==undefined){
  //       this.playpausechecked = !this.playpausechecked
  //     }
  //     if(this.playpausechecked){
  //     this.videoID.play()
  //     }else{
  //       this.videoID.pause();     
  //     }
  //    }


  //   // if( event.keyCode === 32){
  //    }



  checkVideoPlayer1(id_val) {

  }


  closeShareAlertIcon() {
    document.getElementById('openshareModal').click();
  }



  stopVideo() {
    this.checkVideoID.pause();
    this.checkVideoID.currentTime = 0;
  }

  testmethod() {
    $(document).on('show', '.accordion', function (e) {
      //$('.accordion-heading i').toggleClass(' ');
      $(e.target).prev('.accordion-heading').addClass('accordion-opened');
    });

    $(document).on('hide', '.accordion', function (e) {
      $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
      //$('.accordion-heading i').toggleClass('fa-chevron-right fa-chevron-down');
    });
  }


  AddTocartMethod() {

    var usertoken = sessionStorage.getItem('token');
    if (usertoken == null || usertoken == undefined || usertoken == '') {
      this.sendMessage();
      this.openLoginPage = 'okk';
      return;
    } else {

      if (this.cartlength >= 50) {
        this.tostr.warning('can not add more than 50 items in cart.');
        return;
      } else {
        this.spinner.show();
        var userid = sessionStorage.getItem('uid');
        var course_id = this.course_id;
        var AddToCartObj = { listofIdsforCart: [course_id] }

        this.Studentservice.AddToCartService(userid, AddToCartObj).subscribe((response) => {
          if (response) {
            if (response['status'] == 200) {
              window.location.reload();
              var cartresponse_message = response['message'];
              this.tostr.success(cartresponse_message, '', { timeOut: 1000 });
              this.showCartbtnboolean = false;
              var carted_course = response['data'];
              var course_cart_list = carted_course['addedCartUser'];
              this.cartlength = carted_course['addedCartUser'].length;
              // this.cartlength =    5;
              //  window.location.reload(); 
              setTimeout(() => { this.spinner.hide(); }, 1000);

              // /student/mycart      
              this.CartData = course_cart_list;
            }
          }
        }, (error) => {
          setTimeout(() => { this.spinner.hide(); }, 1000);
          if (error.status === 500) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          } else if (error.status === 400) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          } else if (error.status === 401) {
            this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
            this.Authservice.invalidtokenAccress();
          } else if (error.status == 404) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          } else if (error.status === 409) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          } else if (error.status === 406) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          } else if (error.status === 204) {
            this.tostr.error(error.error.message, '', { timeOut: 1000 });
          }
        });

      }
    }

  }


  sendMessage(): void {
    // send message to subscribers via observable subject
    this.observableservice.sendMessage('openloginModal');
    var currentpath = window.location.href;
    this.observableservice.sendpagenameService(currentpath);

  }



  GoTocartMethod() {
    this.route.navigate(['/student/mycart']);
  }

  getCartLength() {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    this.Studentservice.getCartService(userid).subscribe((response) => {
      if (response['status'] == 200) {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        var cart_List = response['data'];
        var cart_course_data = cart_List['cartcourses'];
        this.cartlist = cart_course_data;
        this.cartlength = this.cartlist.length;
        this.cartlength = this.cartlist.length;
        for (var i = 0; i <= this.cartlist.length - 1; i++) {
          if (this.course_id == this.cartlist[i].id) {
            this.showCartbtnboolean = false;
            return;
          } else {
            this.showCartbtnboolean = true;
          }
        }
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      console.log(error);
      if (error.status === 500) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.tostr.error(error.error.message, '', { timeOut: 1000 });
      } 

      // alert(res);
    });
  }



  BuyNowtheCourseMethod() {
    var usertoken = sessionStorage.getItem('token');
    if (usertoken == null || usertoken == undefined || usertoken == '') {
      this.sendMessage();
      this.openLoginPage = 'okk';
      return;
    } else {
      // checkOutCourses
      this.spinner.show();
      var userid = sessionStorage.getItem('uid');
      var course_id = this.course_id;
      var checkoutData = { "listOfPuchasedId": [course_id] }
      this.Studentservice.studentcheckoutService(userid, checkoutData).subscribe((response) => {
        if (response) {
          setTimeout(() => { this.spinner.hide(); }, 1000);
          if (response['status'] == 200 || response['status'] == 201) {
            this.tostr.success(response['message']);
            this.route.navigate(['/student/studentlearning'])
          }
        }
      }, (error) => {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        if (error.status === 500) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 400) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 401) {
          this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
          this.Authservice.invalidtokenAccress();
        } else if (error.status == 404) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 409) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 406) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 204) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        }

      });
    }
  }
  AddtoWishListMethod() {
    var token_val = sessionStorage.getItem('token');
    if (token_val == undefined || token_val == '' || token_val == null) {
      // this.tostr.warning('please login or Signup..!');
      // this.route.navigate(['/home']);
      this.sendMessage();
      return;
    } else {
      this.spinner.show();
      var userid = sessionStorage.getItem('uid');
      var wishListObj = { "wishList": [this.course_id] };
      this.Studentservice.AddWishlistService(userid, wishListObj).subscribe((response) => {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        if (response) {
          if (response['status'] == 200) {
            this.tostr.success(response['message']);
            window.location.reload();
            this.disablethewishlistbutton = true;
          }
        }
      }, (error) => {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        if (error.status === 500) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 400) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 401) {
          this.tostr.warning("Please Access with valid Token", '', { timeOut: 1000 });
          this.Authservice.invalidtokenAccress();
        }
        else if (error.status == 404) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 409) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 406) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 204) {
          this.tostr.error(error.error.message, '', { timeOut: 1000 });
        }
      });
    }
  }

  showpdfnextbtnmethod() {
    if (this.totalPages <= this.page) {
      return;
    } else {
      this.page += 1;
    }
  }
  showpdfpreviousbtnmethod() {
    if (this.page == 1) {
      return;
    }
    this.page -= 1;
  }


  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
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
