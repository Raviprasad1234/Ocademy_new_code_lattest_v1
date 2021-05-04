import { Component, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student/student.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { IfStmt } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  isValid = true;
  getCartTotalPrice: any = 0;
  couponnValue: any = [];

  // filteredCouponNaME
  couponCodeeeee: any = [];
  // filteredCouponNaME
  CouponSuccessDiv = false;
  userCouponRequest: any;
  constructor(private service: AdminService,
    private studentservice: StudentService,
    private router: Router,
    private Authservice: AuthService,
    private spinner: NgxSpinnerService,
    private tostr: ToastrService) { }

  ngOnInit() {
    //this.restrictInspect();
    this.GetCartDetailsMethod();
    this.getAllCoupons();
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.emptycartGuest();
  }
  emptycartGuest() {
    var token = sessionStorage.getItem('token');
    if (token == null || token == '' || token == undefined) {
      this.emptyBoxMessage = true;
      this.allCartDetail = false
    } else {
      this.emptyBoxMessage = false;
      this.allCartDetail = true;
    }
  }

  @Output() passtheCartLengthToheader = new EventEmitter();

  allCouponDetails = [];
  finalObject = [];
  filterResult: any = []
  priceDetails: any = [];


  getAllCoupons() {
    this.spinner.show();
    this.service.getAllCoupons().subscribe((response: any) => {

      if (response) {
        if (response['status'] == 200) {
          setTimeout(() => { this.spinner.hide(); }, 500);
          var coupons_data = response['data'];
          var coupons_list = coupons_data['allCuponsList'];
          this.couponnValue = coupons_list;
          this.allCouponDetails = coupons_list
        }
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
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
  };


  appliedCouponAmount: any = 0;

  checkupdateCoupon: any;

  showDelPriceboolen = false;
  applyingCoupon(data) {
    this.checkupdateCoupon = [];
    if (data == undefined || data == '') {
      this.tostr.warning('please enter valid coupon code ..');
      this.showDelPriceboolen = false;
      return;
    } else {
      this.filterResult = this.allCouponDetails.filter(u =>
        u.couponCode == data
      );
      //  this.showDelPriceboolen = true;
    }
    if (this.filterResult == undefined || this.filterResult == [] || this.filterResult.length == 0) {
      this.tostr.warning('Invalid Coupon Code ..!');
    } else {
      var filterd_CouponID = this.filterResult[0].id;
      this.studentservice.checkCouponisActiveorNotService(filterd_CouponID).subscribe((response) => {
        var data = response['data'];
        var getAllcouponsData = data['coupon'];
        if (getAllcouponsData['status'] == 'Inactive') {
          this.tostr.warning('please enter valid coupon code.');
          return;
        } else if (getAllcouponsData['status'] == 'Active') {
          this.appliedCouponAmount = getAllcouponsData['couponAmount'];
          if (this.appliedCouponAmount > this.getCartTotalPrice) {
            this.tostr.warning('please apply valid coupon');
            return;
          }
          this.getCartTotalPrice = (this.getCartTotalPrice - this.appliedCouponAmount);
          this.CouponSuccessDiv = true;
          this.isValid = false;
          this.tostr.success(' Coupon Applied ');
          return;
        } else if (getAllcouponsData['status'] == "Inactive") {
          this.tostr.warning('please enter valid coupon code.');
        }

      }, (error) => {

      })


    }


    // if(this.filterResult == undefined || this.filterResult==[] || this.filterResult.length == 0 ){
    //  this.tostr.warning('Invalid Coupon Code ..!');
    //  this.showDelPriceboolen = false;
    // } else{
    //   this.showDelPriceboolen = true;
    //  for(var i = 0;i<=this.allCouponDetails.length;i++){



    //   if(this.allCouponDetails[i].couponCode == this.userCouponRequest &&  this.allCouponDetails[i].status == "Active" ){
    //     this.appliedCouponAmount = this.allCouponDetails[i].couponAmount;


    //      if(  this.appliedCouponAmount  >   this.getCartTotalPrice ){
    //       this.tostr.warning('please apply valid coupon');
    //       return;
    //      }

    //     this.getCartTotalPrice =  (this.getCartTotalPrice - this.appliedCouponAmount);
    //     this.CouponSuccessDiv=true;
    //     this.isValid = false; 
    //     this.tostr.success(' Coupon Applied ');
    //      return;
    //   } else if(this.allCouponDetails[i].couponCode == this.userCouponRequest &&  this.allCouponDetails[i].status == "Inactive"){
    //       this.tostr.warning('please enter valid coupon code ..!');
    //   }

    // }
    // }
    // for(var i = 0;i<=this.allCouponDetails.length;i++){
    //   if(this.allCouponDetails[i].couponCode == this.userCouponRequest){
    //     this.appliedCouponAmount = this.allCouponDetails[i].couponAmount;
    //     this.getCartTotalPrice=  (this.getCartTotalPrice - this.appliedCouponAmount);
    //     this.CouponSuccessDiv=true;
    //     this.isValid = false; 
    //     this.tostr.success(' Coupon Applied ');
    //      return;
    //   } else{
    //     this.tostr.warning('Invalid Coupon Code ..!');
    //     return;  
    //   }
    // }







    // if(data){
    //   this.couponCodeeeee = [];
    //   for (var i = 0; i <= this.couponnValue.length - 1; i++) {
    //     if(this.couponnValue[i].couponCode==data){
    //       this.couponCodeeeee.push(this.couponnValue[i].couponCode);    
    //      }   
    //   }  





    //     if(data.length>0){
    //      this.filterResult = this.allCouponDetails.filter(u => 
    //             u.couponCode == data               
    //         );              
    //     }      


    //     this.appliedCouponAmount = this.filterResult[0].couponAmount;

    //     debugger;

    //     if(this.filterResult.length>0){       
    //       this.getCartTotalPrice=  (this.getCartTotalPrice - this.appliedCouponAmount);
    //       this.tostr.success(' Coupon Applied ');
    //       this.CouponSuccessDiv=true;
    //       this.isValid = false;
    //     }else if(this.filterResult==undefined || this.filterResult==null || this.filterResult==''  ){
    //       this.tostr.error('Please Enter Valid Coupon.!');
    //     }
    //     }
    //     else
    //     {        
    //       this.tostr.error('Please enter coupon code.');
    //     }

  }

  RemoveCoupon() {
    this.isValid = true;
    this.userCouponRequest = '';
    this.CouponSuccessDiv = false;
    this.GetCartDetailsMethod();
    this.showDelPriceboolen = false;
  }


  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });

    return data
  }



  getAllCartDataArr: any;

  getAllCartLength: any = 0;
  allCartDetail = true;
  emptyBoxMessage = false;



  getAllCartsArr: any;

  DelPrice: any;

  GetCartDetailsMethod() {
    this.getAllCartsArr = [];
    let sum = 0;
    var userid = sessionStorage.getItem('uid');
    this.studentservice.getCartService(userid).subscribe((response) => {

      if (response) {
        if (response['status'] == 200) {
          var cart_data = response['data'];
          var cart_list_data = cart_data['cartcourses'];
          // this.getAllCartDataArr  = cart_list_data;
          this.getAllCartDataArr = this.removeOacademyUrl(cart_list_data);
          if (this.getAllCartDataArr.length == ' ' || this.getAllCartDataArr.length == 0 || this.getAllCartDataArr.length == null || this.getAllCartDataArr.length == undefined) {
            this.allCartDetail = false;
            this.emptyBoxMessage = true;
          } else {
            for (var i = 0; i <= this.getAllCartDataArr.length - 1; i++) {
              this.cartCourseIDSArr.push(this.getAllCartDataArr[i].id)
            }

            this.getAllCartLength = this.getAllCartDataArr.length || 0;
            this.getAllCartDataArr.forEach(function (item) {
              let calculation = item.price;
              sum += calculation;
            });
            this.getCartTotalPrice = sum;
            // var delprice = this.getCartTotalPrice;
            this.DelPrice = sum;

          }
        }
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
      }
      
    });
  }


  displayCounter(val) {
  }

  cartCourseIDSArr = [];

  listofpurchaseseId: any;

  checkOutMethod() {
    var userid = sessionStorage.getItem('uid');
    var checkoutData = { "listOfPuchasedId": this.cartCourseIDSArr }
    this.listofpurchaseseId = checkoutData['listOfPuchasedId'];
    this.studentservice.studentcheckoutService(userid, checkoutData).subscribe((response) => {
      if (response) {
        if (response['status'] == 201 || response['status'] == 200) {
          var data = response['data'];
          var checkout_Course_Data = data['saveUser'];
          this.tostr.success(response['message'], '', { timeOut: 1000 });
          this.GetCartDetailsMethod();
          this.router.navigate(['/student/studentlearning'])
        }
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
      } 

    })
  }



  removeCartDetailsMethod() {
    var userid = sessionStorage.getItem('uid');
    for (var i = 0; i <= this.listofpurchaseseId.length - 1; i++) {
      var purchaseid = this.listofpurchaseseId[i];
      this.studentservice.removeCartService(userid, purchaseid).subscribe((res) => {
        setTimeout(() => { this.spinner.hide(); }, 500);

        this.GetCartDetailsMethod();
        debugger;
        window.location.reload();
      }, (error) => {
        setTimeout(() => { this.spinner.hide(); }, 500);
      });

    }

  }







  MoveTowishListMethod(val) {
    var userid = sessionStorage.getItem('uid');
    var wishListObj = { "wishList": [val.id] };
    // var wishListObj  = {  "wishList": [this.course_id]} ;

    this.studentservice.AddWishlistService(userid, wishListObj).subscribe((res) => {
      this.tostr.success('course moved to wishlist..!');
      this.RemoveCartMethod(val);
    }, (error) => {
      console.log(error);
    });
  }


  RemoveCartMethod(val) {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    var cartId = val.id;
    this.studentservice.removeCartService(userid, cartId).subscribe((res) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      this.tostr.success('course removed  from the cart successfully..!');
      this.GetCartDetailsMethod();
      window.location.reload();
    }, (error) => {
      this.spinner.hide();
    });
  }


  keepShopingMethod() {
    var token = sessionStorage.getItem('token');
    if (token == null || token == '' || token == undefined) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/student']);
    }
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
