import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
import { ToastrService } from 'ngx-toastr';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { StudentService } from 'src/app/services/student/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var $: any;
declare var videojs: any;

@Component({
  selector: 'app-mylearning',
  templateUrl: './mylearning.component.html',
  styleUrls: ['./mylearning.component.css']
})
export class MylearningComponent implements OnInit {



  slideData: any;
  shortAndSweetCoursesData: any;
  AllTopicsform: FormGroup;
  cp: number = 1


  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private tutorservice: TutorServiceService,
    private Authservice: AuthService,
    private studentservice: StudentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.AllTopicsform = this.formBuilder.group({
      orders: new FormArray([])
    });
  }

  currentPlayingVideo: HTMLVideoElement;


  showSidebarDivPart = true;

  showTopicToggle = false;
  showLevelToggle = false;
  showlangToggle = false;
  showPriceToggle = false;
  Alllevels: any;
  AllLanguages: any;
  AllTopics: any;
  AllPrices: any;
  tags: any;
  sub: any;
  searchheading: any;

  totalstar = 5;
  //   main search page 


  mainSearchHeading = "JavaScript Courses"
  Categories = " Development";
  subCategories = "Web Development";
  LearningNoofStu = 2300
  coursesDes = "Ocademy instructors specialize in teaching the whole scope with beginner to advanced. Whether you're interested in any technology"

  SearchcourseTitle = "The Complete JavaScript ";
  SearchCourseDes = "Ocademy instructors specialize in teaching the whole scope with beginner to advanced. Whether you're interested in any technology";
  SearchCourseAuthor = "Maxmillian";
  SearchCourseRating = "4.5";
  SearchCourseStrength = "10011";
  SeachCourseHour = "23";
  SearchCourseLevel = "ALL Levels";
  SearchCoursePrice = 900;
  SearchCourseActualPrice = 9000;


  //   webDevelopmentCourses = [
  //       "JavaSecript" , "React" , "Angular" , "HTML" , "CSS",
  //       "Web Developement" , "Front End Developement",
  //       "PHP"  , "MongoDB" , "Python"
  //   ];

  //  end main search page 
  s = [
    {
      name: "JavaScript"
    },
    {
      name: "React"
    },
    {
      name: "Angular"
    },
    {
      name: "HTML"
    },
    {
      name: "CSS"
    },
    {
      name: "PHP"
    },
    {
      name: "MongoDB"
    },
    {
      name: "Python"
    }


  ];
  username: any;
  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
  ngOnInit(): void {
    //this.restrictInspect();
    this.username = sessionStorage.getItem('authenticatedUser');
    this.router.params.subscribe((params: Params) => {
      this.searchheading = params.cateName;
    });
    this.getAll();
    this.getOnecourse();
    this.getStudentpurchasedCoursesMethod();
    this.bgcolor

    this.Alllevels = [
      { name: "All Levels", ID: 1 },
      { name: "Beginner", ID: 2 },
      { name: "Intermediate", ID: 3 },
      { name: "Expert", ID: 4 },
      { name: "Advanced", ID: 5 }]
    this.AllLanguages = [
      { name: "All Languages", IDs: 0 },
      { name: "English", IDs: 1 },
      { name: "Hindi", IDs: 2 },
      { name: "Telugu", IDs: 3 },
      { name: "Spanish", IDs: 4 },
      { name: "German", IDs: 5 },
      { name: "Chinese", IDs: 6 },
    ]
    this.AllTopics = [
      { name: "All Topics", id: 0 },
      { name: "Android Development", id: 1 },
      { name: "IOS Development", id: 2 },
      { name: "JavaScript", id: 3 },
      { name: "Angular", id: 4 },
      { name: "React", id: 5 },
      { name: "Financial Analysis", id: 6 },
      { name: "Google Adwards(Ad words)", id: 7 },
      { name: "Internet Marketing", id: 8 },
      { name: "Leadership", id: 9 },
      { name: "Management Skills", id: 10 },
      { name: "Email Marketing", id: 11 },
      { name: "Google Flutter", id: 12 },
      { name: "Swift", id: 13 },]

    this.AllPrices = [{ name: "Paid" }, { name: "Free" }]


    this.slideData = [
      {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Introduction",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 1 : The Basic",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 2 : ",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 3 : Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 4 : Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 4 : Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 5 : Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 6 : Course Overview",
        LectureTime: 18
      }, {
        id: 382,
        CourseTitle: "How To Improve Your Video Quality: Official Ocademy Course",
        CourseHeading: "Part 7 :Course Overview",
        LectureTime: 18
      }
    ];

    this.shortAndSweetCoursesData = [
      {
        "Cid": 1, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event1.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": true,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
      {
        "Cid": 2, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event2.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": false,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
      {
        "Cid": 3, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event1.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": true,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
      {
        "Cid": 4, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event2.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": false,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
      {
        "Cid": 5, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event2.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": true,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
      {
        "Cid": 6, "Cimg": "https://d2tzzaacuulbxu.cloudfront.net/assets/img/event2.jpg", "Ctitle": "The Business Intelligent Analyst Course 2020",
        "CDiscription": " Coder , The IDA for Everyone, instructor Account ", "CStarted": false,
        "CratingPrecent": 30, "Cstarlist": [true, true, true, true, false]
      },
    ]


  }

  config: SwiperOptions = {
    spaceBetween: 30,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    direction: 'horizontal',
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: true
    // },
    breakpoints: {
      1366: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      991: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };

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

  allTopicSubmit() {

  }



  bgcolor = this.getRandomColor();
  getRandomColor() {
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

  }



  checkVideoPlayer(dat, i) {
    var url = dat['fileUrl'] || ''
    if (url != '') {
      $('#myModal' + i).modal('show')
      $("#loadIframe" + i).attr('src', url);
    }

  }


  selectedLevelData: any;

  onChangeTopic(name, event) {
    if (name == "All Topics") {
      this.getAll();
    } else {
      if (event == false) {
        // this.selectedLevelData = [];
        this.getAll();
      } else {
        this.tutorservice.getAllTopics(name).subscribe((response) => {
          if (response) {
            if (response['status'] == 200) {
              var course_topics_data = response['data'];
              var course_topics_list = course_topics_data['courseList'];
              this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
              if (this.selectedLevelData.length == 0) {
                this.showemptyCourses = true;
              } else {
                this.showemptyCourses = false;
              }
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
          
        });
      }
    }

  }

  showemptyCourses = false;

  searchBasedOnTopic(value) {
    this.selectedLevelData = [];
    this.tutorservice.getAllTopics(value.name).subscribe((response) => {
      if (response) {
        if (response['status'] == 200) {
          var course_topics_data = response['data'];
          var course_topics_list = course_topics_data['courseList'];
          this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
          if (this.selectedLevelData.length == 0) {
            this.showemptyCourses = true;
          } else {
            this.showemptyCourses = false;
          }
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
      
    });
  };



  getAll() {
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getAllCoursesByCourseID(userid).subscribe((res) => {
      if (res) {
        this.selectedLevelData = this.removeOacademyUrl(res);
        if (this.selectedLevelData.length == 0) {
          this.showemptyCourses = true;
        } else {
          this.showemptyCourses = false;
        }
      }
    }, (error) => {
      this.toastr.error('Server Not respond', '', { timeOut: 1000 });
    });
  }

  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['fileUrl'])
        element['fileUrl'] = element['fileUrl'].split('oacademy/').join('')
    });
    return data
  }


  removeCoverImageOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });
    return data
  }





  onChangeLevel(name, event) {
    if (name == "All Levels") {
      this.getAll();
    } else {
      if (event == false) {
        // this.selectedLevelData = [];
        this.getAll();
      } else {
        this.tutorservice.getAllLevelsData(name).subscribe((response) => {
          if (response) {
            if (response['status'] == 200) {
              var course_level_data = response['data'];
              var course_level_list = course_level_data['courseList'];
              this.selectedLevelData = this.removeOacademyUrl(course_level_list);
              if (this.selectedLevelData.length == 0) {
                this.showemptyCourses = true;
              } else {
                this.showemptyCourses = false;
              }
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
          
        });
      }
    }

  }



  onOptionslevelSelected(value) {
    this.selectedLevelData = [];
    if (value == 'All Levels') {
      this.getAll();
    } else {
      this.tutorservice.getAllLevelsData(value).subscribe((response) => {
        if (response) {
          if (response['status'] == 200) {
            var course_level_data = response['data'];
            var course_level_list = course_level_data['courseList'];
            this.selectedLevelData = this.removeOacademyUrl(course_level_list);
            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
            } else {
              this.showemptyCourses = false;
            }
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
        

      });


    }


  }



  onChangeLanguages(name, event) {
    if (name == "All Languages") {
      this.getAll();
    } else {
      if (event == false) {
        this.getAll();
      } else {
        this.tutorservice.getAllLanguages(name).subscribe((response) => {
          if (response) {
            if (response['status'] == 200) {
              var course_topics_data = response['data'];
              var course_topics_list = course_topics_data['courseList'];
              this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
              if (this.selectedLevelData.length == 0) {
                this.showemptyCourses = true;
              } else {
                this.showemptyCourses = false;
              }
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
          
        });
      }
    }
  }

  changeCheckbox(tags, i) {

    if (tags) {
      this.tags[i].checked = !this.tags[i].checked;

    }
  }

  showSideBarDiv() {
    this.showSidebarDivPart = !this.showSidebarDivPart;
  }

  showbtnArrowtopic = true;
  TopicListMethod() {
    this.showTopicToggle = !this.showTopicToggle;
    this.showbtnArrowtopic = !this.showbtnArrowtopic;

  }
  showbtnArrowLevel = true;
  showLevelMethod() {
    this.showLevelToggle = !this.showLevelToggle;
    this.showbtnArrowLevel = !this.showbtnArrowLevel;
  }
  showbtnArrowLang = true;
  showLangMethod() {
    this.showlangToggle = !this.showlangToggle;
    this.showbtnArrowLang = !this.showbtnArrowLang;
  }

  showbtnArrowPrice = true;
  showPriceMethod() {
    this.showPriceToggle = !this.showPriceToggle;
    this.showbtnArrowPrice = !this.showbtnArrowPrice
  }


  private videoJSplayer: any;


  ngAfterViewInit(): void {
    // this.initVideoJs();
  }

  innerviewpage(id, val) {
    this.route.navigate(['student/details', { sid: id, courseTitle: val }]);
    // this.route.navigate(['student/details'], { state: { sid: id, courseTitle: val } });
  }



  gotocart(id, val) {
    this.route.navigate(['/gotocart', { cid: id, courseTitle: val }]);
  };

  showfilData = false;
  test = "A";
  filterShowHide() {
    this.test = "B";
    this.showfilData = !this.showfilData;
  }
  //   

  selectedLevel1Data: any;
  firstCourse: any;
  All_ratings: any;
  Avg_Rating: any;
  all_Data: any = [];

  ifnoCourseDataAvailable = false;

  studentsAreviewingboolen = false;

  recommendedforyousectionboolen = false;

  getOnecourse() {
    this.firstCourse = [];
    this.All_ratings = [];
    var userid = sessionStorage.getItem('uid');
    this.studentservice.getAllCoursesService().subscribe((response) => {
      if (response['status'] == 200) {
        // courseList
        var course_List = response['data'];

        var courselistAll = course_List['courseList'];

        if(courselistAll.length == 0 || courselistAll == []){

          this.ifnoCourseDataAvailable = true;
          this.studentsAreviewingboolen = true;
          this.recommendedforyousectionboolen = true;
        } else{
          this.ifnoCourseDataAvailable = false;
          this.studentsAreviewingboolen = false;
          this.recommendedforyousectionboolen = false;
          this.selectedLevel1Data = this.removeOacademyUrl(course_List['courseList']);
        this.all_Data = this.removeCoverImageOacademyUrl(this.selectedLevel1Data);
        this.firstCourse = this.all_Data.reverse()
        // this.firstCourse = this.removeCoverImageOacademyUrl(this.selectedLevel1Data);        
        for (var i = 0; i <= this.firstCourse.length - 1; i++) {
          for (var j = 0; j <= this.firstCourse[i].rating.length - 1; j++) {
            if (this.firstCourse.id == this.firstCourse[i].rating.course_id) {
              this.All_ratings = (this.firstCourse[i].rating);
              var avg = this.All_ratings.reduce((a, { ratingType }) => a + ratingType, 0) / this.All_ratings.length;
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
      }
      
    });
  }



  StudentPurchaseCoursesArr: any;

  ifStudentNotPurchaseCourses = false;

  getStudentpurchasedCoursesMethod() {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    this.studentservice.getStudentPurchasedCourses(userid).subscribe((response) => {
      if (response) {
        setTimeout(() => { this.spinner.hide(); }, 500);
        if (response['status'] == 200) {
          var course_list_data = response['data'];
          var course_list = course_list_data['courseList'];
          console.log(course_list_data);

          console.log(course_list, "course_list");
          this.StudentPurchaseCoursesArr = this.removeCoverImageOacademyUrl(course_list);
          if (this.StudentPurchaseCoursesArr.length == 0) {
            this.ifStudentNotPurchaseCourses = true;
          } else {
            this.ifStudentNotPurchaseCourses = false;
          }
        }
      }
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
    })
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
      
      1366: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      991: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      500: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      400: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };


  showDotsData = false
  showDotsMethod(index, data) {
    for (var i = 0; i <= this.shortAndSweetCoursesData.length - 1; i++) {
      if (this.shortAndSweetCoursesData[i].Cid == data.Cid) {
        this.shortAndSweetCoursesData[i].showsharediv = !this.shortAndSweetCoursesData[i].showsharediv
      } else {
        this.shortAndSweetCoursesData[i].showsharediv = false;
      }
    }
  }


  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
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
