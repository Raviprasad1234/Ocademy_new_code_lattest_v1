import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
import { ToastrService } from 'ngx-toastr';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var $: any;
declare var videojs: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  AllTopicsform: FormGroup;
  cp:number=1


  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private Authservice : AuthService,
    private tutorservice: TutorServiceService, private toastr: ToastrService) {
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
  
  ngOnInit(): void {

    this.router.params.subscribe((params: Params) => {
      this.searchheading = params.cateName;
    });
    this.getAll();
    this.bgcolor

    this.Alllevels = [
      { name: "All Levels", ID: 1 },
      { name: "Beginner", ID: 2 },
      { name: "Intermediate", ID: 3 },
      { name: "Expert", ID: 4 },
      { name: "Advanced" ,ID:5 }]
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




  }

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
            if(response['status']== 200){
              var course_topics_data  = response['data'];
              var course_topics_list  =   course_topics_data['courseList'];
            this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
            this.selectedLevelData.sort(function (a, b) {
              return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
            });
            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
            } else {
              this.showemptyCourses = false;
            }
          }
          }
        }, (error) => {
          if (error.status === 500) {
            this.toastr.error(error.error.message,'', {timeOut: 1000});
          }  else if (error.status === 400) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        } else if (error.status === 401) {
          this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
          this.Authservice.invalidtokenAccress();
       }  else if(error.status == 404){
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 409) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 406) {
          this.toastr.error(error.error.message,'', {timeOut: 1000});
        } else if(error.status ===  204 ){
          this.toastr.error(error.error.message,'', {timeOut: 1000});
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
        if(response['status']== 200){
          var course_topics_data  = response['data'];
          var course_topics_list  =   course_topics_data['courseList'];
        this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
        this.selectedLevelData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.selectedLevelData.length == 0) {
          this.showemptyCourses = true;
        } else {
          this.showemptyCourses = false;
        }
      }
    }
    }, (error) => {   
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }  else if (error.status === 401) {
      this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
      this.Authservice.invalidtokenAccress();
   }  else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    }
  });
  };



  getAll() {
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getVideoAllMethod().subscribe((response) => {
      if (response['status']== 200) {
        var course_List = response['data'];
        var course_List_Data      = course_List['courseList'];
        this.selectedLevelData = this.removeOacademyUrl(course_List_Data);
        this.selectedLevelData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.selectedLevelData.length == 0) {
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
      this.Authservice.invalidtokenAccress();
   }  else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    }
    
    });
  }

  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['fileUrl'])
        element['fileUrl'] = element['fileUrl'].split('oacademy/').join('')
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
            if(response['status'] == 200){
              var course_level_data = response['data'];
              var course_level_list = course_level_data['courseList'];
            this.selectedLevelData = this.removeOacademyUrl(course_level_list);
            this.selectedLevelData.sort(function (a, b) {
              return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
            });
            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
            } else {
              this.showemptyCourses = false;
            }
           }
          }
        }, (error) => {
          if (error.status === 500) {
            this.toastr.error(error.error.message,'', {timeOut: 1000});
          }  else if (error.status === 400) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }  else if (error.status === 401) {
          this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
          this.Authservice.invalidtokenAccress();
       }  else if(error.status == 404){
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 409) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 406) {
          this.toastr.error(error.error.message,'', {timeOut: 1000});
        } else if(error.status ===  204 ){
          this.toastr.error(error.error.message,'', {timeOut: 1000});
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
          if(response['status'] == 200){
            var course_level_data = response['data'];
            var course_level_list = course_level_data['courseList'];
          this.selectedLevelData = this.removeOacademyUrl(course_level_list);
          this.selectedLevelData.sort(function (a, b) {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
          if (this.selectedLevelData.length == 0) {
            this.showemptyCourses = true;
          } else {
            this.showemptyCourses = false;
          }
        }
        }
      }, (error) => {
        if (error.status === 500) {
          this.toastr.error(error.error.message,'', {timeOut: 1000});
        }  else if (error.status === 400) {
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
        this.Authservice.invalidtokenAccress();
     } else if(error.status == 404){
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }else if (error.status === 409) {
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }else if (error.status === 406) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      } else if(error.status ===  204 ){
        this.toastr.error(error.error.message,'', {timeOut: 1000});
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
            if(response['status']== 200){
              var course_topics_data  = response['data'];
              var course_topics_list  =   course_topics_data['courseList'];
            this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
            this.selectedLevelData.sort(function (a, b) {
              return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
            });
            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
            } else {
              this.showemptyCourses = false;
            }
           }
          }
        }, (error) => {
          if (error.status === 500) {
            this.toastr.error(error.error.message,'', {timeOut: 1000});
          }  else if (error.status === 400) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }  else if (error.status === 401) {
          this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
          this.Authservice.invalidtokenAccress();
       }  else if(error.status == 404){
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 409) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        }else if (error.status === 406) {
          this.toastr.error(error.error.message,'', {timeOut: 1000});
        } else if(error.status ===  204 ){
          this.toastr.error(error.error.message,'', {timeOut: 1000});
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

  innerviewpage(id, val){
    this.route.navigate(['/gotocart', {sid: id, courseTitle: val}]);    
  }


  showfilData = false;
  test = "A";
  filterShowHide() {
    this.test = "B";
    this.showfilData = !this.showfilData;
  }




}
