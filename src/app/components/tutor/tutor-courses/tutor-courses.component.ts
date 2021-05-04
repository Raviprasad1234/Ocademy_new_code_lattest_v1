import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn, FormBuilder,
  FormControl, Validators, FormArray,
  FormGroup, ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'
import { AdminService } from 'src/app/services/admin/admin.service';
import { customValidationService } from 'src/app/services/common/custom.validation.service';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import { Observable, of } from 'rxjs';
import { SharingService } from 'src/app/services/common/passData.subject.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-tutor-courses',
  templateUrl: './tutor-courses.component.html',
  styleUrls: ['./tutor-courses.component.css']
})
export class TutorCoursesComponent implements OnInit {

  thome_left = false;
  thome_right = false;
  get_all_dropdown_data = [];
  catData: any;
  dollardata: any;
  dolardataa: any;
  cp: number = 1;
  tabs = [
    {
      id: 0,
      class: "fa fa-dashboard",
      name: "Dashboard",
      active: true
    },
    {
      id: 1,
      class: "fa fa-file",
      name: "Courses1",
      active: false
    },
    {
      id: 2,
      class: "fa fa-film",
      name: "Communication",
      active: false
    },
    {
      id: 3,
      class: "fa fa-comments",
      name: "Reports",
      active: false
    }
  ]
  stab = this.tabs[0]

  noresultMessage = "No Results Found..!";

  // course creation variable starts
  selectedVideo: File;
  progressInfo: any;
  postData = {};
  TosaveData = false;
  isDisabled: boolean = false;
  isDisabledPrice: boolean = false;
  defaultSubcategory = "---Select Any Sub Category---";
  ReportsArray: any;
  StudentDashboardData: any;
  //course creation variable ends
  private selectOption: any;
  selectLanguage: any;

  TutorCourseSelected: any;
  filtered: any;
  TutorCourseSearchFilter: any;

  SelectedTutorCreatedCourses: any

  constructor(private formBuilder: FormBuilder,
    private tutorservice: TutorServiceService,
    private adminservice: AdminService,
    private sharingservice: SharingService,
    private Authservice: AuthService,
    private category_service: CategoriesService,
    private customValidationservice: customValidationService,
    private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) {

    this.SelectedTutorCreatedCourses = [
      {
        id: 1,
        label: "Select your option",
        value: 0
      }, {
        id: 2,
        label: "Newest"
      }, {
        id: 3,
        label: "Oldest"
      }, {
        id: 4,
        label: "A-Z"
      }, {
        id: 4,
        label: "Z-A"
      }, {
        id: 5,
        label: "Published"
      }, {
        id: 5,
        label: "Unpublished"
      }
    ];
    this.TutorCourseSelected = this.SelectedTutorCreatedCourses[0];
  }

  /* course creation starts*/

  registerForm: FormGroup;
  submitted = false;
  ngOnInit(): void {
    //this.restrictInspect();
    this.getAllCoursesForTutorsMethod();
    this.Get_All_Category();
    this.getAll();
    this.snav_tabs_click(this.stab);

    this.registerForm = this.formBuilder.group({
      Categories: ['', Validators.required],
      // title: ['', [Validators.required , Validators.maxLength(10)]],
      title: ['', [Validators.required, Validators.compose([Validators.required,
      Validators.pattern("^([-a-zA-Z0-9!@#$%^&]+)+[^]+[-a-zA-Z\s0-9!@#$%^&]+([-a-zA-Z0-9!@#$%^&]+)*$"),
      Validators.maxLength(60)])]],
      Subcategory: ['', Validators.required],
      topicName: ['', Validators.required],
      Level: ['', [Validators.required]],
      Languages: ['', [Validators.required]],
      // Price: ['', [Validators.required  ,
      //   Validators.pattern("^[0-9]*$")]],
      Price: ['', [Validators.required]],
      uploadfile: [''],
      acceptTerms: [false],
      fileSource: [''],
      defaultPrice: ['']
    });



    this.ReportsArray = [{
      "orderId": "1243", "emailid": "test@test.com", "mobilenum": "900011111011",
      "productname": "Angular 10 Course", "discount": "20%", "totalamount": "1500",
      "transactiondate": "20-10-2020", "status": "Done"
    }]



    this.StudentDashboardData = [
      {
        "sno": 1, "sname": "Ocademy", "sid": 1212,
        "status": [
          { name: 'Active', value: '1', checked: true },
          { name: 'Inactive', value: '2', checked: false },
          { name: 'Delete', value: '3', checked: true }
        ]
      },
      {
        "sno": 2, "sname": "Ocademy", "sid": 1212,
        "status": [
          { name: 'Active', value: '4', checked: true },
          { name: 'Inactive', value: '5', checked: false },
          { name: 'Delete', value: '6', checked: false }
        ]
      },
      {
        "sno": 3, "sname": "Ocademy", "sid": 1212,
        "status": [
          { name: 'Active', value: '7', checked: true },
          { name: 'Inactive', value: '8', checked: true },
          { name: 'Delete', value: '9', checked: false }

        ]
      }
    ];

    this.addValidator();


  }

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // if (this.registerForm.get('fileSource').value == null || this.registerForm.get('fileSource').value == "" || this.registerForm.get('fileSource').value == undefined) {
    //   this.showerrorDiv = true;
    //   // return;
    // }
    // this.showerrorDiv = false;

    if (this.registerForm.invalid) {
      // alert('please enter the required fields..');
      return;
    }
    if (this.registerForm.value['Price'] == undefined) {
      this.postData['price'] = this.registerForm.value['defaultPrice'];
    } else {
      this.postData['price'] = this.registerForm.value['Price'];
    }
    this.postData['topicName'] = this.registerForm.value['topicName'];
    this.postData['title'] = this.registerForm.value['title'];
    this.postData['level'] = this.registerForm.value['Level'];
    this.postData['language'] = this.registerForm.value['Languages'];
    this.postData['createdBy'] = 'tutor';
    this.postData['level'] = this.registerForm.value['Level'];

    this.postData['courseTitle'] = this.registerForm.value['title'];

    this.postData['category'] = this.registerForm.value['Categories'];

    this.postData['subCategory'] = this.registerForm.value['Subcategory'];

    this.postData['topic'] = this.registerForm.value['topicName'];
    this.submitVideo(this.postData);
    // }
  }

  onReset() {
    this.submitted = false;
    // this.registerForm.reset('');
    this.isDisabled = false;
    this.registerForm = this.formBuilder.group({
      Categories: ['', Validators.required],
      // title: ['', [Validators.required , Validators.maxLength(10)]],
      title: ['', [Validators.required, Validators.compose([Validators.required, Validators.maxLength(60)])]],

      Subcategory: ['', Validators.required],
      topicName: ['', Validators.required],
      Level: ['', [Validators.required]],
      Languages: ['', [Validators.required]],
      // Price: ['', [Validators.required  ,
      //   Validators.pattern("^[0-9]*$")]],
      Price: [''],
      uploadfile: [''],
      acceptTerms: [false],
      fileSource: [''],
      defaultPrice: ['']
    });
    this.myInputVariable.nativeElement.value = '';
  }

  //   category select dynamic data 


  Get_All_Category() {
    this.category_service.getCategoriesFamily().subscribe(response => {
      if (response['status'] == 200) {
        var categories_data = response['data'];
        var categoryList = categories_data['categoryList'];
        this.get_all_dropdown_data = categoryList
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
    });
  }
  SubCatrgoriesData = [];
  OnCategoryChange(event) {
    this.SubCatrgoriesData = [];
    this.catData = [];
    this.subsubcat = [];
    this.dollardata = event;
    for (var i = 0; i <= this.get_all_dropdown_data.length - 1; i++) {
      //  this.catData.push(this.arr[i]);
      if (this.get_all_dropdown_data[i].categoryName == this.dollardata) {
        // this.shwsubcatselect=true
        for (var j = 0; j <= this.get_all_dropdown_data[i].subcategories.length - 1; j++) {
          this.SubCatrgoriesData.push(this.get_all_dropdown_data[i].subcategories[j].subCategoriesName)
        }
      }
    }
  }


  subsubcat: any = [];
  subfunsubmit(event) {
    this.dolardataa = event;
    this.subsubcat = [];
    for (var i = 0; i <= this.get_all_dropdown_data.length - 1; i++) {
      if (this.get_all_dropdown_data[i].categoryName == this.dollardata) {

        for (var j = 0; j <= this.get_all_dropdown_data[i].subcategories.length - 1; j++) {
          if (this.get_all_dropdown_data[i].subcategories[j].subCategoriesName == this.dolardataa) {
            // this.shwsubsubcatselect=true

            for (var k = 0; k <= this.get_all_dropdown_data[i].subcategories[j].topic.length - 1; k++) {
              this.subsubcat.push(this.get_all_dropdown_data[i].subcategories[j].topic[k].topicName)
            }

          }
        }
      }
    }
  }




  // catagory select data end//

  CheckPrice(event) {
    if (event.target.value - 1 >= 0) {
      event.target.value -= 1;
    }
    if (event.target.value > 0) {
      this.registerForm.controls['acceptTerms'].disable();
    } else {
      this.registerForm.controls['acceptTerms'].enable();
    }
  }

  onacceptTermsChange(event) {
    if (event.target.checked == true) {
      this.registerForm.controls['Price'].disable();
      this.registerForm.get("Price").setValue('0');
      // this.registerForm.get("Price").patchValue('0'); 
      this.registerForm.patchValue({
        defaultPrice: '0'
      });
      this.isDisabledPrice = true;
    } else {
      this.isDisabledPrice = false;
      this.registerForm.controls['Price'].enable();
    }
  }

  showfiletypeError = false;

  myFiles: any[] = [];

  f_name: any = "";

  onFileChanged(event) {
    this.isDisabled = false;
    if (event.target.files.length > 0) {

      // jpeg and png 

      // image/png

      if (event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/gif") {
        const file = event.target.files[0];
        var inp_file = event.target.files[0];
        this.f_name = inp_file['name'].split(' ').join('');
        this.showfiletypeError = false;
        this.showerrorDiv = false;
        this.selectedVideo = event.target.files;
        this.registerForm.patchValue({
          fileSource: file
        });
      } else {
        this.showfiletypeError = true;
        this.showerrorDiv = false;
        return;
      }



      // if (event.target.files[0].type == 'video/mp4') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'image/gif') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'text/plain') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'application/vnd.ms-excel') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'application/pdf') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'video/webm') {
      //   this.showfiletypeError = true;
      //   this.showerrorDiv = false;
      //   return;
      // } else if (event.target.files[0].type == 'video/mpeg') {
      //     this.showfiletypeError = true;
      //     this.showerrorDiv = false;
      //     return;
      // } else {
      //   this.showfiletypeError = false;
      //   this.showerrorDiv = false;
      //   this.selectedVideo = event.target.files;
      //   this.registerForm.patchValue({
      //     fileSource: file
      //   });
      // }


      // this.CategoriesVideoForm.setValue({
      //   fileSource: file
      // });


    }
  }
  resetCreateSectionForm() {
    this.submitted = false;
    this.showerrorDiv = false;
  }
  showerrorDiv = false;

  UploadCoverImage() {
    if (this.registerForm.get('fileSource').value == null ||
      this.registerForm.get('fileSource').value == "" || this.registerForm.get('fileSource').value == undefined) {
      this.showerrorDiv = true;
      this.showfiletypeError = false;
      return;
    } else {
      this.showerrorDiv = false;
      this.spinner.show()
      var formdata = new FormData();

      // formdata.append('image', this.registerForm.get('fileSource').value);
      // var f_name = inp_file['name'].split(' ').join('');


      formdata.append('file', this.registerForm.get('fileSource').value, this.f_name);
      this.tutorservice.postUploadVideo(formdata).subscribe((data: any) => {
        setTimeout(() => { this.spinner.hide(); }, 500);
        if (Array.isArray(data)) {
          if (!data.length) {
            return
          }
        }
        this.toastr.success('Cover Image uploaded..!', '', { timeOut: 1000 });
        this.isDisabled = true;
        setTimeout(() => {
          setTimeout(() => { this.spinner.hide(); }, 500);
        }, 1000);
        this.postData['coverImageUrl'] = data['fileUrl'] || '';
      }), (error) => {
        var errorMsg = error
        // Swal.fire('error!', errorMsg, 'error')
        setTimeout(() => { this.spinner.hide(); }, 500);
        this.toastr.error('Cover Image not uploaded..');
        this.isDisabled = false;
        setTimeout(() => {
          setTimeout(() => { this.spinner.hide(); }, 500);
        }, 3000);

      };
    }
  }

  checkVideoPlayer(dat, i) {
    var url = dat['fileUrl'] || ''
    if (url != '') {
      $('#myModal' + i).modal('show')
      // $("#loadIframe" + i).attr('src', url);
    }

  }

  submitVideo(data) {
    this.spinner.show();

    var userid = sessionStorage.getItem('uid');
    this.tutorservice.CategoriesSubmit(userid, data).subscribe(response => {
      if (response) {
        if (response['status'] === 201) {
          setTimeout(() => {
            setTimeout(() => { this.spinner.hide(); }, 500);
            this.onReset();
            document.getElementById('closebtn').click();
            // this.toastr.success('Course has been created successfully..!');
            this.toastr.success('Course has been created successfully..!', '', { timeOut: 1000 });
            //this.snav_tabs_click(this.stab);
            // this.router.navigate(['/search']);
            this.getAll();
          }, 1000);
          this.TosaveData = true;
        }
        else if (response['status'] === 200) {
          this.toastr.warning('please check the details..', '', { timeOut: 1000 });
        }
      }





    }, (error) => {
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
            // Swal.fire('error!', 'Something went wrong!', 'error')
      setTimeout(() => { this.spinner.hide(); }, 500);
    });
  }


  /* course creation ends */


  /*dashboard starts*/

  nav_to_home() {
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  nav_over() {
    this.thome_left = true
    this.thome_right = true
  }
  nav_out() {
    this.thome_left = false
    this.thome_right = false
  }
  actinactAllTabs(inp) {
    this.tabs.forEach(element => {
      element['active'] = inp
    });
  }
  snav_tabs_click(tb) {
    this.stab = tb
    this.actinactAllTabs(false)
    tb['active'] = 'true';

  }

  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });

    return data
  }


  removeCoverImageOacademyUrl(data) {
    data = data.split('oacademy/').join('')
    return data
  }


  /*dashboard ends*/

  StudentAllCoursesData: any;
  noData = false;
  noDatafield = true;
  getAll() {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getAllCoursesByCourseID(userid).subscribe((res) => {
      this.spinner.hide()
      if (res == [] || res == '' || res == null || res == undefined) {
        this.noDatafield = false;
        this.noData = true;
        setTimeout(() => { this.spinner.hide(); }, 500);
      } else {
        this.noData = false;
        this.noDatafield = true;
        // this.StudentAllCoursesData = res;

        this.StudentAllCoursesData = this.removeOacademyUrl(res);
        this.StudentAllCoursesData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        setTimeout(() => { this.spinner.hide(); }, 500);
      }
    }, (error) => {
      this.toastr.error('Server Not respond', '', { timeOut: 1000 });
      this.spinner.hide()
    });
  }

  currentPlayingVideo: HTMLVideoElement;



  onPlayingVideo(event) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
    } else {
      // if the user plays a new video, pause the last one and play the new one
      if (event.target !== this.currentPlayingVideo) {
        this.currentPlayingVideo.pause();
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
      }
    }
  }

  showDotsData = false
  showDotsMethod(index, data) {
    for (var i = 0; i <= this.StudentAllCoursesData.length - 1; i++) {
      if (this.StudentAllCoursesData[i].courseTitle == data.courseTitle) {
        this.StudentAllCoursesData[i].showsharediv = !this.StudentAllCoursesData[i].showsharediv
      } else {
        this.StudentAllCoursesData[i].showsharediv = false;
      }
    }
  }


  noofStudentsTablesPage = false;
  noofTutorsTablesPage = false;


  noofStudentsTablesPage1 = true;
  noofTutorsTablesPage1 = true;

  showStudentsTableContent() {
    this.noofStudentsTablesPage = true;
    this.noofTutorsTablesPage = false;
    this.noofStudentsTablesPage1 = true;
    this.noofTutorsTablesPage1 = false;

  }

  showTutorTableContent() {
    this.noofStudentsTablesPage = false;
    this.noofTutorsTablesPage = true;
    this.noofStudentsTablesPage1 = false;
    this.noofTutorsTablesPage1 = true;

  }

  updateCheckedOptions(option, event) {

  }


  nav_to_courseMaker(c) {
    var id = c.id || 0;
    var CourseTitles = c.courseTitle || '';
    sessionStorage.setItem('title', CourseTitles);
    sessionStorage.setItem('cid', id);
    this.router.navigate(['/coursemaker', { selectedCourse: c.courseTitle }])
  };


  // courses at Asc Order 

  getAllCoursesByAscSortServiceMethod(userId) {
    this.tutorservice.getAllCoursesByAscSortAToZService(userId).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        this.StudentAllCoursesData = this.removeOacademyUrl(response);
        //   if(response['status']== 200){
        //       var course_data = response['data'];
        //       var courseStat = course_data['courseStatus'];


        //       if(courseStat <= 0 ){

        //       } else{
        //         var course_list = course_data['courseList'];
        //         this.StudentAllCoursesData =  this.removeOacademyUrl(course_list);
        //       }
        // }
      }

      // this.StudentAllCoursesData = data;
      // this.StudentAllCoursesData =  this.removeOacademyUrl(data);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } 
      

    });
  }


  // end  courses at ASC Order 


  // courses at DESC Order 

  getAllCoursesByDescSortServiceMethod(userId) {
    this.tutorservice.getAllCoursesByDescSortZToAService(userId).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        this.StudentAllCoursesData = this.removeOacademyUrl(response);
        //   if(response['status']== 200){
        //       var course_data = response['data'];
        //       var courseStat = course_data['courseStatus'];
        //       if(courseStat <= 0 ){

        //       } else{
        //         var course_list = course_data['courseList'];
        //         this.StudentAllCoursesData =  this.removeOacademyUrl(course_list);
        //       }
        // }

      }

      // this.StudentAllCoursesData = data;
      // this.StudentAllCoursesData =  this.removeOacademyUrl(data);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      

    });
  }
  //  end courses at DESC Order 

  // get all courses lattest 

  getAllCoursesByLattestServiceMethod(userId) {
    this.tutorservice.getAllCoursesByLattestService(userId).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        this.StudentAllCoursesData = this.removeOacademyUrl(response);
        //   if(response['status']== 200){
        //       var course_data = response['data'];
        //       var courseStat = course_data['courseStatus'];
        //       if(courseStat <= 0 ){

        //       } else{
        //         var course_list = course_data['courseList'];
        //         this.StudentAllCoursesData =  this.removeOacademyUrl(course_list);

        //       }
        // }
      }

      // this.StudentAllCoursesData = data;
      // this.StudentAllCoursesData =  this.removeOacademyUrl(data);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      

    });
  }
  // get all courses lattest end

  // get all courses oldest

  getAllCoursesByOldestServiceMethod(userId) {
    this.tutorservice.getAllCoursesByOldestService(userId).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        this.StudentAllCoursesData = this.removeOacademyUrl(response);

        //   if(response['status']== 200){
        //       var course_data = response['data'];
        //       var courseStat = course_data['courseStatus'];
        //       if(courseStat <= 0 ){

        //       } else{
        //         var course_list = course_data['courseList'];
        //         this.StudentAllCoursesData =  this.removeOacademyUrl(course_list);

        //       }
        // }
      }

      // this.StudentAllCoursesData = data;
      // this.StudentAllCoursesData =  this.removeOacademyUrl(data);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      

    });
  }




  // get all courses oldest end 

  // status = ['Newest', 'Oldest', 'A-Z', 'Z-A', 'Published first', 'Unpublished first'];


  onTutorSearchOptionsSelected(event) {
    // console.log(this.TutorCourseSelected);

    console.log(event, "event");

    if (event['label'] == 'Newest') {
      // this.StudentAllCoursesData.sort(function (a, b) {
      //   return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      // });
      var userid = sessionStorage.getItem('uid');
      this.getAllCoursesByLattestServiceMethod(userid);
    } else if (event['label'] == 'Oldest') {
      var userid = sessionStorage.getItem('uid');
      this.getAllCoursesByOldestServiceMethod(userid);
      // this.StudentAllCoursesData.sort(function (a, b) {
      //   return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
      // });
    } else if (event['label'] == 'A-Z') {
      // this.StudentAllCoursesData.sort((a, b) => a.courseTitle > b.courseTitle ? 1 : -1);
      var userid = sessionStorage.getItem('uid');
      this.getAllCoursesByAscSortServiceMethod(userid);

    } else if (event['label'] == 'Z-A') {
      // this.StudentAllCoursesData.sort((a, b) => a.courseTitle < b.courseTitle ? 1 : -1);
      var userid = sessionStorage.getItem('uid');
      this.getAllCoursesByDescSortServiceMethod(userid);
    } else if (event['label'] == 'Published') {
      this.getPublishedCourses();
    } else if (event['label'] == 'Unpublished') {
      this.getUnpublishedCourses();
    } else {
      this.getAll();
    }

    this.filtered = this.SelectedTutorCreatedCourses.filter(t => t.value == this.TutorCourseSelected);
  }



  getPublishedCourses() {
    // getpublishStatus
    this.spinner.show();
    // var publish = 'published'
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getpublishStatus(userid).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        if (response['status'] == 200) {
          var course_data = response['data'];
          var courseStat = course_data['courseStatus'];
          //  this.noresultMessage =  response['message'];
          if (courseStat <= 0) {
            var course_list = [];

            this.StudentAllCoursesData = [];
          } else {
            var course_list = course_data['courseList'];
            this.StudentAllCoursesData = this.removeOacademyUrl(course_list);
          }
        }
      }

      // this.StudentAllCoursesData = data;
      // this.StudentAllCoursesData =  this.removeOacademyUrl(data);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 500);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } 
      

    });
  }

  getUnpublishedCourses() {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getunPublishStatus(userid).subscribe(response => {

      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        if (response['status'] == 200) {
          var course_data = response['data'];
          // var course_list = course_data['courseList'];
          // this.StudentAllCoursesData =  this.removeOacademyUrl(course_list);

          //  this.noresultMessage =  response['message'];

          var courseStat = course_data['courseStatus'];
          if (courseStat <= 0) {
            var course_list = [];

            this.StudentAllCoursesData = [];
          } else {
            var course_list = course_data['courseList'];
            this.StudentAllCoursesData = this.removeOacademyUrl(course_list);
          }


        }
      }

    }, (error) => {
      this.spinner.hide();
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      

    });
  }





  removeDuplicatesTitleMethod(event) {
  }


  getAllTutorsCourses: any;

  getAllCoursesForTutorsMethod() {
    this.tutorservice.getVideoAllMethod().subscribe((response) => {
      if (response['status'] == 200) {
        var course_List = response['data'];
        this.getAllTutorsCourses = course_List['courseList'];
      }
    }, (error) => {
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
    });
  }




  // user name alredy exists 


  addValidator() {
    this.registerForm.controls['title'].setAsyncValidators([this.isValidName(), this.isValidNameNotInList()]);
  }

  isValidName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      let bReturn: boolean = true;
      if (this.registerForm.controls['title'].value == '') {
        bReturn = false;
      }
      let err: ValidationErrors = { 'invalid': true };
      return bReturn ? of(null) : of(err);
    };
  }

  isValidNameNotInList(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      let bReturn: boolean = true;
      for (var i = 0; i < this.getAllTutorsCourses.length; i++) {
        if ((this.getAllTutorsCourses[i].courseTitle) != null) {
          var entered_Course_title = this.registerForm.controls['title'].value;
          var entered_Course_title_upper_case = entered_Course_title.toUpperCase();
          var searched_course_title = this.getAllTutorsCourses[i].courseTitle
          var searched_course_title_upper_case = searched_course_title.toUpperCase();
          if (entered_Course_title_upper_case == searched_course_title_upper_case)
          // if (this.registerForm.controls['title'].value == this.getAllTutorsCourses[i].courseTitle)
          {
            bReturn = false;
          }

        }

      }

      let err: ValidationErrors = { 'exists': true };
      return bReturn ? of(null) : of(err);
    };
  }



  // end  user name alredy exists 


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
