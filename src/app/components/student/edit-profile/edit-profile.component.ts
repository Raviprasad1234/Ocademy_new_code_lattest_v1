import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student/student.service';
import { ConfirmedValidator } from './confirm-validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private toster: ToastrService,
    private router: Router,
    private studentservice: StudentService) { }
  editProfileForm: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.CheckUserDetailsMethod();
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      currentpassword: ['', [Validators.required]],
      // title: ['', [Validators.required , Validators.maxLength(10)]],
      newpassword: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,15}')]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('newpassword', 'confirm_password')
    });

  }


  get f() { return this.editProfileForm.controls; }

  submitEditProfileData() {
    this.submitted = true;

    var obj = {
      current: this.editProfileForm.controls.currentpassword.value,
      conf: this.editProfileForm.controls.confirm_password.value
    }


    console.log(obj.current, "obj.current");

    console.log(obj.conf, "obj.conf");


    if (this.editProfileForm.invalid) {
      return
    } else if (obj.current == obj.conf) {
      this.toster.error('Present password & Confirm Password can not be same ');
      return;
    } else {
      var userid = sessionStorage.getItem('uid');


      var updateuserDetailsObj = {
        "email": this.editProfileForm.value['email'],
        "password": (this.editProfileForm.value['confirm_password']).replace(/^\s+/g, '')
      }
      //  "username" : this.editProfileForm.value['username'],
      var current_password = btoa(this.editProfileForm.controls.currentpassword.value);

      this.studentservice.updateuserDetailsandPasswordService(userid, current_password, updateuserDetailsObj).subscribe((res) => {

        this.toster.success('Profile Updated Successfully..!');
        // this.router.navigate(['student']);
        // this.editProfileForm.reset();
        this.CheckUserDetailsMethod();
        this.resetform();
      }, (error) => {
        this.toster.error(error['error'].message);
      });
      // this.editProfileForm.reset();
    }
  }


  resetform() {
    this.submitted = false;
    this.editProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentpassword: ['', [Validators.required]],
      // title: ['', [Validators.required , Validators.maxLength(10)]],
      newpassword: ['', Validators.required],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('newpassword', 'confirm_password')
    });

  }


  checkusername: any;
  checkemailaddress: any;
  CheckUserDetailsMethod() {
    var userid = sessionStorage.getItem('uid');
    this.studentservice.getuserDetailsByUserIDService(userid).subscribe((res) => {
      this.checkusername = res['username'];
      this.checkemailaddress = res['email'];
      this.editProfileForm.patchValue({
        username: this.checkusername
      });
      this.editProfileForm.patchValue({
        email: this.checkemailaddress
      });
    }, (error) => {
    })
  };


  backtohome() {
    this.router.navigateByUrl('/student');
  }





}
