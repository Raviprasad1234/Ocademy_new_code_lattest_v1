import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student/student.service';
import { ConfirmedValidator } from './resetpassrod-confirm-validator';
declare var $: any;


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {


  userid: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toster: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private Authservice: AuthService,
    private studentservice: StudentService) {

    var id = this.route.snapshot['_routerState'].url
    var afterQuestionmark = id.substr(id.indexOf('?') + 1);
    this.userid = afterQuestionmark;
    this.route.queryParams.subscribe(params => {
      //  this.userid = (Object.keys(params)[0]);
    });
  }

  resetpasswordForm: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.resetpasswordForm = this.formBuilder.group({
      newpassword: ['', [Validators.required,
      Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,15}')]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('newpassword', 'confirm_password')
    });



  }
  showred = false;
  showorange = false;
  showlgreen = false;
  showgreen = false;

  cshowred = false;
  cshoworange = false;
  cshowlgreen = false;
  cshowgreen = false;

  newpasswordval: any;
  cnewpasswordval: any;

  newpassword(eve) {
    this.newpasswordval = eve.target.value;
    var len = eve.target.value.length;
    if (len === 0) {
      this.showred = false;
      this.showorange = false;
      this.showlgreen = false;
      this.showgreen = false;
    } else if (len <= 4) {
      this.showred = true;
      this.showorange = false;
      this.showlgreen = false;
      this.showgreen = false;
    } else if (len >= 4 && len <= 6) {
      this.showred = true;
      this.showorange = true;
      this.showlgreen = false;
      this.showgreen = false;
    } else if (len >= 6 && len <= 8) {
      this.showred = true;
      this.showorange = true;
      this.showlgreen = true;
      this.showgreen = false;
    } else if (len >= 8) {
      this.showred = true;
      this.showorange = true;
      this.showlgreen = true;
      this.showgreen = true;
    }
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(eve.target.value);
  }

  confirmpassword(eve) {
    this.cnewpasswordval = eve.target.value;
    var len = eve.target.value.length;
    if (len === 0) {
      this.cshowred = false;
      this.cshoworange = false;
      this.cshowlgreen = false;
      this.cshowgreen = false;
    } else if (len <= 4) {
      this.cshowred = true;
      this.cshoworange = false;
      this.cshowlgreen = false;
      this.cshowgreen = false;
    } else if (len >= 4 && len <= 6) {
      this.cshowred = true;
      this.cshoworange = true;
      this.cshowlgreen = false;
      this.cshowgreen = false;
    } else if (len >= 6 && len <= 8) {
      this.cshowred = true;
      this.cshoworange = true;
      this.cshowlgreen = true;
      this.cshowgreen = false;
    } else if (len >= 8) {
      this.cshowred = true;
      this.cshoworange = true;
      this.cshowlgreen = true;
      this.cshowgreen = true;
    }
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (this.newpasswordval === this.cnewpasswordval) {
    } else {
    }
    return re.test(eve.target.value);

  }

  get f() { return this.resetpasswordForm.controls; }

  submitResetFormData() {
    this.spinner.show();
    if (this.resetpasswordForm.valid) {
      //  var uid = decodeURIComponent(this.userid);

      var uid = this.userid;

      // var uid = "raviprasadreddy12122"
      var updateuserDetailsObj = {
        "password": (this.resetpasswordForm.value['confirm_password']).replace(/^\s+/g, '')
      };
      this.studentservice.forgotpasswordService(uid, updateuserDetailsObj).subscribe((response) => {
        if (response) {
          // if(response['status'] == 200){
          var resetpasswordmessage = response['message'];
          this.toster.success('Password Reset Successful..!')
          // this.toster.success(resetpasswordmessage, '', )
          this.router.navigate(['/home']);
          setTimeout(() => { this.spinner.hide(); }, 500);
          // }
        }
      }, (error) => {
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

      })
      //  /ocademy/user/changePassword/{userId}

      this.resetpasswordForm.reset();
    } else {
      // alert('invalid form')
    }

  }



}
