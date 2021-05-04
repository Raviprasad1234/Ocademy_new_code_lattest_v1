import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
import { ToastrService } from 'ngx-toastr';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObservableService } from 'src/app/services/common/Observable-service';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var $: any;
declare var videojs: any;

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalsearchComponent implements OnInit {

  AllTopicsform: FormGroup;
  cp:number=1
  // paginationDiv:boolean;

  All_courses_len :any;
  showfilData = false;
  TopicName : any;
  invalidSearch=false;
  afterInvalid=true;
  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private Authservice : AuthService,
    private router: ActivatedRoute,
    private  spinner : NgxSpinnerService,
    private category_service: CategoriesService,
    private ObservableSer :ObservableService ,
    private StuServivce : StudentService,
    private tutorservice: TutorServiceService, private toastr: ToastrService,
    private studentservice: StudentService,) {
    this.AllTopicsform = this.formBuilder.group({
      orders: new FormArray([])
    });


     sessionStorage.getItem('uid');
     

  }

  currentPlayingVideo: HTMLVideoElement;


  showSidebarDivPart = true;

  showTopicToggle = true;
  showLevelToggle = true;
  showlangToggle = true;
  showPriceToggle = false;
  Alllevels: any;
  AllLanguages: any;
  AllTopics: any;
  AllPrices: any;
  tags: any;
  sub: any;
  searchheading: any;

  noOfCourses :any;

  //   main search page 


  mainSearchHeading = "JavaScript Courses"
  Categories = "";
  subCategories = "";
  courseTitle = '';
  LearningNoofStu = 2300
  coursesDes = "Ocademy instructors specialize in teaching the whole scope with beginner to advanced. Whether you're interested in any technology"

  SearchCourseDes = "Ocademy instructors specialize in teaching the whole scope with beginner to advanced. Whether you're interested in any technology";
  SearchCourseAuthor = "Maxmillian";
  SearchCourseRating = "4.5";
  SearchCourseStrength = "10011";
  SeachCourseHour = "23";
  SearchCourseLevel = "ALL Levels";
  SearchCoursePrice = 900;
  SearchCourseActualPrice = 9000;
  noOfvideos : any;
  studentCourseResultLength : any = 0;


  //   webDevelopmentCourses = [
  //       "JavaSecript" , "React" , "Angular" , "HTML" , "CSS",
  //       "Web Developement" , "Front End Developement",
  //       "PHP"  , "MongoDB" , "Python"
  //   ];

  //  end main search page 
 
  subscription :Subscription;

  ngOnInit(): void {
    //this.restrictInspect();
    this.router.params.subscribe((params: Params) => {
      this.searchheading = params.cateName;
      if(this.searchheading == '' || this.searchheading == null || this.searchheading == undefined){
        this.getAll();
      } else{   
        this.globalSearchData(this.searchheading);         //this.getByCatGlobalmethod(this.searchheading);
        //this.getBySubCatGlobalmethod(this.searchheading);
      }
    });  

    this.Alllevels = [
      // { name: "All Levels", ID: 1 ,checked: false },
      { name: "Beginner", ID: 2 ,checked: false},
      { name: "Intermediate", ID: 3 ,checked: false},
      { name: "Expert", ID: 4  ,checked: false},
      { name: "Advanced" ,ID:5  ,checked: false}]
    this.AllLanguages = [
      // { name: "All Languages", IDs: 0 ,checked: false },
      { name: "English", IDs: 1 ,checked: false },
      { name: "Hindi", IDs: 2 ,checked: false },
      { name: "Telugu", IDs: 3 ,checked: false},
      { name: "Spanish", IDs: 4 ,checked: false },
      { name: "German", IDs: 5 ,checked: false },
      { name: "Chinese", IDs: 6 ,checked: false},
    ];
    this.AllTopics = [
      // { name: "All Topics", id: 0 , checked : false},
      { name: "Android Development", id: 1 , checked : false},
      { name: "IOS Development", id: 2 , checked : false},
      { name: "JavaScript", id: 3 , checked : false },
      { name: "Angular", id: 4 , checked : false },
      { name: "React", id: 5 , checked : false },
      { name: "Financial Analysis", id: 6  , checked : false},
      { name: "Google Adwards(Ad words)", id: 7 , checked : false},
      { name: "Internet Marketing", id: 8 , checked : false },
      { name: "Leadership", id: 9  , checked : false},
      { name: "Management Skills", id: 10 , checked : false},
      { name: "Email Marketing", id: 11 , checked : false },
      { name: "Google Flutter", id: 12 , checked : false},
      { name: "Swift", id: 13 , checked : false },]

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


  // global search 

  showAllCat = [];
  subCatVal : any;
  showTopicNameNavigationIcon = false;
  showSubCatNavigationIcon = false;

  globalSearchResponse : any;
  searchedCourseTitle : any;
  searchedCourseLevel : any;
  searchedCourseLanguage : any;

  NoSearchResultMsg  = false;
  showIfSearchResults = true;
  CATNAME : any;
  final : any;
  serachedCatValue : any;
  searchedSubCatValue : any;
  searchedTopicValue : any;
  SearchcourseTitle : any;
  NoResulltsFoundmessage :any = false;


  globalSearchData(searchVal){    


    console.log(searchVal , "searchVal");

    // this.showfilData = false;
    this.serachedCatValue = null;
    this.searchedSubCatValue =null;
    this.searchedTopicValue = null;
    var checkUppercaseseachvalue = (searchVal.toUpperCase()).trim();
    this.selectedLevelData = [];
    this.tutorservice.getVideoAllMethod().subscribe((response) => {
      if(response['status'] == 200){
        var course_List = response['data'];
        this.globalSearchResponse = course_List['courseList'];
        this.studentCourseResultLength = 0; 
        this.showfilData = false;

        if(this.globalSearchResponse.length == 0 || this.globalSearchResponse  == []){
          this.All_courses_len = 0;
          this.showfilData = false;
          return;
        } else { 

        //  this.All_courses_len = 0;
        for(var i = 0 ;  i <= this.globalSearchResponse.length-1;i++ ){
          if((this.globalSearchResponse[i].category)!=null && this.globalSearchResponse[i].subCategory!=null && this.globalSearchResponse[i].topic!=null && (this.globalSearchResponse[i].courseTitle)!=null ){         
            var temp = (this.globalSearchResponse[i].category).toUpperCase();
            var temp1 = (this.globalSearchResponse[i].subCategory).toUpperCase();
            var temp2 = (this.globalSearchResponse[i].topic).toUpperCase();
            // if((this.globalSearchResponse[i].courseTitle)!=null ){
              var temp3 = (this.globalSearchResponse[i].courseTitle).toUpperCase();  
            // }
            if(checkUppercaseseachvalue == temp){
            this.Categories = this.globalSearchResponse[i].category;
            this.serachedCatValue = this.globalSearchResponse[i].category;
            // this.getCategoriesSearchMethod(this.Categories);
            this.getCourseByCategoryOrSubCategoryOrTopicMethod();
            // this.NoSearchResultMsg = false;
            // this.showIfSearchResults = true;
            return;
          } else if(checkUppercaseseachvalue == temp1){
            this.Categories = this.globalSearchResponse[i].category;
            this.subCategories = this.globalSearchResponse[i].subCategory;
            this.searchedSubCatValue = this.globalSearchResponse[i].subCategory;
            // this.getSubCategoriesSearchMethod(this.subCategories);
            this.getCourseByCategoryOrSubCategoryOrTopicMethod();
             this.showSubCatNavigationIcon = true; 
            // this.NoSearchResultMsg = false;
            // this.showIfSearchResults = true; 
            return;
          } else if(checkUppercaseseachvalue == temp2){
              this.Categories = this.globalSearchResponse[i].category;
              this.subCategories = this.globalSearchResponse[i].subCategory;
              this.TopicName = this.globalSearchResponse[i].topic;
              this.searchedTopicValue = this.globalSearchResponse[i].topic;
              // this.getTopicNameSearchMethod(this.TopicName);
              this.getCourseByCategoryOrSubCategoryOrTopicMethod();
              this.showSubCatNavigationIcon = true;
              this.showTopicNameNavigationIcon = true;
              return;
          } else if(checkUppercaseseachvalue == temp3){
            this.searchedCourseTitle = this.globalSearchResponse[i].courseTitle;
            this.Categories = this.globalSearchResponse[i].category;
            this.subCategories = this.globalSearchResponse[i].subCategory;
            this.TopicName = this.globalSearchResponse[i].topic;
            this.courseTitle = this.globalSearchResponse[i].courseTitle;

            this.SearchcourseTitle = this.courseTitle;
            this.getCourseByCategoryOrSubCategoryOrTopicMethod();
            // this.getCourseTitleSearchMethod(this.searchedCourseTitle);
            this.showSubCatNavigationIcon = true;
            this.showTopicNameNavigationIcon = true;
            return;
           } else{
            this.All_courses_len = 0;
            this.showfilData = false;
            // alert('no data');
           } 
          } else{
            this.All_courses_len = 0;
            this.showfilData = false;
          } 
       }

  
      }

      }      
    } , (error)=>{
      this.All_courses_len = 0;    
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    } 
    else if (error.status === 401) {
      this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
      this.Authservice.invalidtokenAccress();
   } 
    else if(error.status == 404){
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
  getCourseByCategoryOrSubCategoryOrTopicMethod(){

   
    // this.All_courses_len = -1;

    this.showfilData = false;
    this.selectedLevelData = [];
    var categoryName = this.serachedCatValue || null;
    var SubCatName =  this.searchedSubCatValue || null;
    var TopicName = this.searchedTopicValue || null;

    var course_Title = this.SearchcourseTitle || null;
 
    this.spinner.show();

    this.StuServivce.getCourseByCategoryOrSubCategoryOrTopicService(categoryName,SubCatName,TopicName , course_Title).subscribe((response)=>{
      if (response) {
        setTimeout(() => {this.spinner.hide();}, 1000);
        if(response['status'] == 200){

          this.showfilData = true;


          
    console.log("cat selected  geting result");

          var course_cat_data =  response['data'];
          var course_cat_list =    course_cat_data['courseList'];

        this.All_courses_len = course_cat_list.length;

    
        if( course_cat_list.length == 0){
          this.NoResulltsFoundmessage = true;
          this.All_courses_len = 0; 
          // this.invalidSearch=true;
        }else{
           this.NoResulltsFoundmessage = false;
           this.invalidSearch= false;
      
        }
        this.noOfvideos = course_cat_list;
        this.studentCourseResultLength = this.noOfvideos.length;
        this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
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
    },(error)=>{
      setTimeout(() => {this.spinner.hide();}, 1000);
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }  else if (error.status === 401) {
      this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
      this.Authservice.invalidtokenAccress();
   }   
    else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } 
  //   else{
	//     this.toastr.error(error.error.message,'', {timeOut: 1000});
	// }
});

}

  // get cat name 


  getCategoriesSearchMethod(catval){
    this.selectedLevelData = [];
    this.tutorservice.getCoursesByCategoriesService(catval).subscribe((response) => {
      if (response) {
        if(response['status'] == 200){
          var course_cat_data =  response['data'];
          var course_cat_list =    course_cat_data['courseList']
        this.noOfvideos = course_cat_list;
        if( this.noOfvideos.length==0){
          this.invalidSearch=true;
          this.afterInvalid=false;
        }else{
          this.invalidSearch=false;
          this.afterInvalid=true;
        }
        this.studentCourseResultLength = this.noOfvideos.length;
        this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
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
     } 

     else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    }
  //    else{
	//     this.toastr.error(error.error.message,'', {timeOut: 1000});
	// }
    });
  }

  // getby cat name end

// get sub cat name

getSubCategoriesSearchMethod(subcatval){
  this.selectedLevelData = [];
  this.tutorservice.getCoursesBySubCategoriesService(subcatval).subscribe((response) => {


    if (response) {
      if(response['status'] == 200){
          var course_data = response['data'];
          var course_list =   course_data['courseList']
      this.noOfvideos = course_list;
      if( this.noOfvideos.length==0){
        this.invalidSearch=true;
        this.afterInvalid=false;
        
      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;

      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_list);
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
    setTimeout(() => {this.spinner.hide();}, 1000);
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
//    else{
//     this.toastr.error(error.error.message,'', {timeOut: 1000});
// }
  });
}
// end  sub cat name 


//  course Title Seach 

getCourseTitleSearchMethod(CourseTitleVal){
  this.selectedLevelData = [];
  this.tutorservice.getCourseByCourseTitleService(CourseTitleVal).subscribe((response) => {
    // if (response) {
    //   if(response['status'] == 200){
    //       var course_data = response['data'];
    //       var course_list =   course_data['courseList']
    //   this.noOfvideos = course_list;
    if (response) {
      if(response['status'] == 200){
          var course_data = response['data'];
          var course_list =   course_data['courseListByTitle']
      this.noOfvideos = course_list;
      if( this.noOfvideos.length==0){
        this.invalidSearch=true;
        this.afterInvalid=false;
        
      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;

      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_list);
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
    setTimeout(() => {this.spinner.hide();}, 1000);
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
//   else{
//     this.toastr.error(error.error.message,'', {timeOut: 1000});
// }
  });

}




// end Course Title Name

// topic name search
  getTopicNameSearchMethod(Val){
    this.selectedLevelData = [];
    this.tutorservice.getAllTopics(Val).subscribe((response) => {

      if (response['status'] == 200) {
        var course_List = response['data'];
        this.noOfvideos = course_List['courseList'];
      
        this.studentCourseResultLength = this.noOfvideos.length;
        this.selectedLevelData = this.removeOacademyUrl(course_List['courseList']);
        this.selectedLevelData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.selectedLevelData.length == 0) {
          this.showemptyCourses = true;
          this.NoSearchResultMsg=true;
        } else {
          this.showemptyCourses = false;
          this.NoSearchResultMsg=true;

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
  //   else{
	//     this.toastr.error(error.error.message,'', {timeOut: 1000});
	// }

      
    });
  }

  // end topic name search

 // search by language 

 getLanguageSearchMethod(Val){
  this.selectedLevelData = [];


  this.tutorservice.getCourseByCourseLanguageService(Val).subscribe((response) => {
    if (response) {
        if(response['status']== 200){
          var courses_lang_data  = response['data'];
          var courses_lang_list =   courses_lang_data['courseList'];
          this.noOfvideos = courses_lang_list;
          if( this.noOfvideos.length==0){
            this.invalidSearch=true;
            this.afterInvalid=false;     
          }else{
            this.invalidSearch=false;
            this.afterInvalid=true;
          }
          this.studentCourseResultLength = this.noOfvideos.length;
          this.selectedLevelData = this.removeOacademyUrl(courses_lang_list);
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

 // end search by language

  // search By Level 

  
 getLevelSearchMethod(Val){
  this.selectedLevelData = [];

  this.tutorservice.getCourseByCourseLevelService(Val).subscribe((response) => {
    if (response) {
      if(response['status']== 200) {
      var courses_level_data  = response['data'];
      var courses_level_list =   courses_level_data['courseList'];
      this.noOfvideos = courses_level_list;
      if( this.noOfvideos.length==0){
        this.invalidSearch=true;
        this.afterInvalid=false;
      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;
      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(courses_level_list);
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


// end Search by Level

  getByCatGlobalmethod(Val){
    this.selectedLevelData = [];
    this.category_service.getByCatServiceMethod(Val).subscribe((response) => {

      if(response){
          if(response['status']== 200){
            var categories_data = response['data'];
            var  category_courseList  =   categories_data['courseList'] 
            this.noOfvideos = category_courseList;
            if( this.noOfvideos.length==0){
              this.invalidSearch=true;
            }else{
              this.invalidSearch=false;
            }
            this.studentCourseResultLength = this.noOfvideos.length;        
            this.selectedLevelData = this.removeOacademyUrl(category_courseList);
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


getBySubCatGlobalmethod(Val){
  this.selectedLevelData = [];
  this.category_service.getByCatServiceMethod(Val).subscribe((response) => {
    if(response){
      if(response['status']== 200){
        var categories_data = response['data'];
        var  category_courseList  =   categories_data['courseList'] 
        this.noOfvideos = category_courseList;
        this.studentCourseResultLength = this.noOfvideos.length;
        this.selectedLevelData = this.removeOacademyUrl(category_courseList);
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
  
  // global search  end
  checkVideoPlayer(dat, i) {
    var url = dat['fileUrl'] || ''
    if (url != '') {
      $('#myModal' + i).modal('show')
      $("#loadIframe" + i).attr('src', url);
    }

  }

  NofoundData = false;

  selectedLevelData: any;
  onChangeTopic(name, event) {
    if (name == "All Topics") {
      this.getAll();
    } else {
      if (event == false) {
        this.getAll();
      } else {
        this.tutorservice.getAllTopics(name).subscribe((response) => {  
          if (response) {

              if(response['status']== 200){
                var course_topics_data  = response['data'];
                var course_topics_list  =   course_topics_data['courseList'];

                if( course_topics_list == [] || course_topics_list.length == 0){
                  this.NofoundData = true; 
                  this.noOfvideos = course_topics_list;
                  this.studentCourseResultLength = this.noOfvideos.length;
                  this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
              
                } else{
                  this.NofoundData = false;     
                  this.noOfvideos = course_topics_list;
                  this.studentCourseResultLength = this.noOfvideos.length;
                  this.selectedLevelData = this.removeOacademyUrl(course_topics_list);

                  this.selectedLevelData.sort(function (a, b) {
                    return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
                  });
                  if (this.selectedLevelData.length == 0) {
                    this.showemptyCourses = true;
                    // this.paginationDiv=false
                  } else {
                    this.showemptyCourses = false;
                    // this.paginationDiv=true;
                  }
                }
              }
          }
        }, (error) => {
          this.selectedLevelData = [];
          this.showemptyCourses = true;
          // this.paginationDiv=false
          this.NofoundData = true;
          if (error.status === 500) {
            this.toastr.error(error.error.message,'', {timeOut: 1000});
          }  else if (error.status === 400) {
           this.toastr.error(error.error.message,'', {timeOut: 1000});
        } else if (error.status === 401) {
          this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
          this.Authservice.invalidtokenAccress();
       }  else if(error.status == 404){
          //  this.toastr.warning(error.error.message,'', {timeOut: 1000});
          // this.toastr.warning('Not Found',name , {timeOut: 1000});
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
          this.noOfvideos = course_topics_list;
        this.studentCourseResultLength = this.noOfvideos.length; 
        this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
        this.selectedLevelData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.selectedLevelData.length == 0) {
          this.showemptyCourses = true;
          // this.paginationDiv=false
        } else {
          this.showemptyCourses = false;
          // this.paginationDiv=true;
         }
        }
      }
    }, (error) => {
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
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
  };


  getAll() {
    this.NofoundData = false;     
    var userid = sessionStorage.getItem('uid');
    this.tutorservice.getVideoAllMethod().subscribe((response) => {
      if(response['status'] == 200){
        var course_List = response['data'];
        this.noOfvideos  = course_List['courseList'];
        if( this.noOfvideos.length==0){
          this.invalidSearch=true;
          this.afterInvalid=false;
        }else{
          this.invalidSearch=false;
          this.afterInvalid=true;
        }   
        this.studentCourseResultLength = this.noOfvideos.length;        
        this.selectedLevelData = this.removeOacademyUrl(course_List['courseList']);
        this.selectedLevelData.sort(function (a, b) {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.selectedLevelData.length == 0) {
          this.showemptyCourses = true;
          // this.paginationDiv=false
        } else {
          this.showemptyCourses = false;
          // this.paginationDiv=true;
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

  // removeOacademyUrl(data) {
  //   data.forEach(element => {
  //     if (element['fileUrl'])
  //       element['fileUrl'] = element['fileUrl'].split('oacademy/').join('')
  //   });
  //   return data
  // }


  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });

    return data
  }


    checkArray:any=[];
  onChangeLevel(name, event) {     
    this.NofoundData = false;     
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
            this.noOfvideos = course_level_list;
            this.studentCourseResultLength = this.noOfvideos.length;          
            this.selectedLevelData=(this.removeOacademyUrl(course_level_list));           
            this.selectedLevelData.sort(function (a, b) {
              return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
            });

            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
              // this.paginationDiv=false
            } else {
              this.showemptyCourses = false;
              // this.paginationDiv=true;   
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
          //  this.toastr.error(error.error.message,'', {timeOut: 1000});
          this.toastr.warning('Not Found',name , {timeOut: 1000});
     
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
    this.NofoundData = false;     
               
    this.selectedLevelData = [];
    if (value == 'All Levels') {
      this.getAll();
    } else {
      var categoryName = this.serachedCatValue || null;
      var SubCatName =  this.searchedSubCatValue || null;
      var TopicName = this.searchedTopicValue || null;
      var levelName =  value || null;

      // getTheCoursebasedOnlevelService(Cat, SubCat, TopicName,levelName){
      this.StuServivce.getTheCoursebasedOnlevelService(categoryName ,SubCatName, TopicName , levelName).subscribe((response) => {
        if (response) {
          if(response['status'] == 200){
            var course_level_data = response['data'];
            var course_level_list = course_level_data['courseList'];
          this.noOfvideos = course_level_list;
          this.studentCourseResultLength = this.noOfvideos.length;  
          this.selectedLevelData = this.removeOacademyUrl(course_level_list);
          this.selectedLevelData.sort(function (a, b) {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
          if (this.selectedLevelData.length == 0) {
            this.showemptyCourses = true;
            // this.paginationDiv=false
            this.NofoundData = true;
            this.invalidSearch = true;
          } else {
            this.showemptyCourses = false;
            // this.paginationDiv=true;
            this.NofoundData = false;
            this.invalidSearch = false;
          }
        }
        }
      }, (error) => {
        this.NofoundData = true;
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
            this.noOfvideos = course_topics_list;
            this.studentCourseResultLength = this.noOfvideos.length;
                 
            this.selectedLevelData = this.removeOacademyUrl(course_topics_list);
            this.selectedLevelData.sort(function (a, b) {
              return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
            });
            if (this.selectedLevelData.length == 0) {
              this.showemptyCourses = true;
              // this.paginationDiv=false
            } else {
              this.showemptyCourses = false;
              // this.paginationDiv=true;
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
          //  this.toastr.error(error.error.message,'', {timeOut: 1000});
          this.toastr.warning('Not Found',name , {timeOut: 1000});
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



  // selected Courses by Topic name

  selectedTopicArr :any=[];

  selecedByTopicNameArr : any;

  hidePaginationDiv =false;

  Slected_Courses_by_TopicName_method(name, event , selectedId){

    this.selectedTopicArr = [];
    // this.selecedByTopicNameArr = [];
    for(var i = 0 ; i<= this.AllTopics.length-1;i++){ 
      if(event  == true &&  this.AllTopics[i].name == name){
        this.AllTopics[i].checked = true;
        this.selectedTopicArr = [];
    }else if(event  == false &&  this.AllTopics[i].name == name){
        this.AllTopics[i].checked = false;
        this.selectedTopicArr = [];
      }      
    }
    var TestResults = this.AllTopics.filter(data => data.checked == true);
    for(var i = 0 ; i<TestResults.length;i++){
      this.selectedTopicArr.push(TestResults[i].name);
    }

    this.selecedByTopicNameArr = this.selectedTopicArr; 

    var categoryName = this.serachedCatValue || null;
    var SubCatName =  this.searchedSubCatValue || null;
    var TopicName = this.searchedTopicValue || null;
    var SelectedTopicName =  this.selectedTopicArr || null;


    if(this.selectedTopicArr.length >= 1 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){
      this.studentservice.filterbyTopicWiseService(categoryName, SubCatName , TopicName , SelectedTopicName).subscribe((response)=>{

        var course_cat_data =  response;
        var course_cat_list =   response;
      this.noOfvideos = course_cat_list;

    

      if( this.noOfvideos.length==0){

    
        // this.NoSearchResultMsg =  true;
        this.showIfSearchResults = false; 
        this.invalidSearch=true;
        this.afterInvalid=false;
        this.NofoundData = true; // no resuylts found

        this.hidePaginationDiv = false; // pagination Div

      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;
        this.NoSearchResultMsg =  false;
        this.showIfSearchResults = true; 
        this.NofoundData = false;
        this.hidePaginationDiv = false; // pagination Div
      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
      this.selectedLevelData.sort(function (a, b) {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
      if (this.selectedLevelData.length == 0) {
        this.showemptyCourses = true;
      } else {
        this.showemptyCourses = false;
      }
    
        // this.TestArr = [];
    }, (error)=>{
      console.log(error);
   
   
   
    });
    } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length == 0 ){
      this.Slected_Courses_by_TopicName_and_level_method();

    } else if(this.selectedTopicArr.length >= 1 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length >=1){
        this.Slected_Courses_by_TopicName_and_language_method();
      } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length >= 1){
        this.Slected_Courses_by_TopicName_Level_and_language_method();
      } else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){
        this.getCourseByCategoryOrSubCategoryOrTopicMethod();
      } 

 
    // debugger;

  //   if(this.selectedLevelArr.length != 0 && this.selectedTopicArr != []){
  //     this.Slected_Courses_by_TopicName_and_level_method();
  //   }else if(this.selectedTopicArr != [] ){
  //   } else if(this.selectedLanguageArr.length !=0){
  //   var  SelectedLanguageName  = this.selectedLanguageArr;

  //   this.studentservice.filterbyLanguagewiseService(categoryName, SubCatName , TopicName , SelectedLanguageName).subscribe((response)=>{

  //     var course_cat_data =  response;
  //     var course_cat_list =   response;
  //   this.noOfvideos = course_cat_list;

  //   if( this.noOfvideos.length==0){

  //     // this.NoSearchResultMsg =  true;
  //     this.showIfSearchResults = false; 
  //     this.invalidSearch=true;
  //     this.afterInvalid=false;
  //     this.NofoundData = true; // no resuylts found

  //     this.hidePaginationDiv = false; // pagination Div

  //   }else{
  //     this.invalidSearch=false;
  //     this.afterInvalid=true;
  //     this.NoSearchResultMsg =  false;
  //     this.showIfSearchResults = true; 
  //     this.NofoundData = false;
  //     this.hidePaginationDiv = false; // pagination Div
  //   }
  //   this.studentCourseResultLength = this.noOfvideos.length;
  //   this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
  //   this.selectedLevelData.sort(function (a, b) {
  //     return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
  //   });
  //   if (this.selectedLevelData.length == 0) {
  //     this.showemptyCourses = true;
  //   } else {
  //     this.showemptyCourses = false;
  //   }
  
  //     // this.TestArr = [];
  // }, (error)=>{
  //   console.log(error);
  // });

// }

  }

  // filterbyTopicWiseService(CatName , SubCatName , TopicName , SelectedTopicName){
  // }
  // end  selected Courses by Topic name


  // slected Courses by Level Name

selectedLevelArr = [];

selecedByLevelArr : any;

Slected_Courses_by_Level_method(name, event){
  this.selectedLevelArr = [];
  // this.selecedByLevelArr = [];
  for(var i = 0 ; i<= this.Alllevels.length-1;i++){ 
    if(event  == true &&  this.Alllevels[i].name == name){
      this.Alllevels[i].checked = true;
      this.selectedLevelArr = [];
  }else if(event  == false &&  this.Alllevels[i].name == name){
      this.Alllevels[i].checked = false;
      this.selectedLevelArr = [];
    }      
  }
  var TestResults = this.Alllevels.filter(data => data.checked == true);
  for(var i = 0 ; i<TestResults.length;i++){
    this.selectedLevelArr.push(TestResults[i].name);
  }

  this.selecedByLevelArr = this.selectedLevelArr;
 
  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedLevelName =  this.selectedLevelArr || null;

  if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length == 0){
    this.studentservice.filterbyLevelwiseService(categoryName, SubCatName , TopicName , SelectedLevelName).subscribe((response)=>{
      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;
    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  });

 
  } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length == 0 ){
    this.Slected_Courses_by_TopicName_and_level_method();
  } else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length >= 1 ){
     this.Slected_Courses_by_Level_and_language_method();
  } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length >= 1){
    this.Slected_Courses_by_TopicName_Level_and_language_method();
  }  else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){
    this.getCourseByCategoryOrSubCategoryOrTopicMethod();
  }  else if(this.selectedTopicArr.length >= 1 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){

    var SelectedTopicName = this.selectedTopicArr || null;

    this.studentservice.filterbyTopicWiseService(categoryName, SubCatName , TopicName , SelectedTopicName).subscribe((response)=>{

      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;



    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
 
 
 
  });


  }  else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length >= 1){

    var SelectedLanguageName  = this.selectedLanguageArr || null;

    this.studentservice.filterbyLanguagewiseService(categoryName, SubCatName , TopicName , SelectedLanguageName).subscribe((response)=>{
      var course_cat_data =  response;
      var course_cat_list =   response;
      this.noOfvideos = course_cat_list;
    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  });


  }


}


// end  slected Courses by Level Name


// slected Courses by language 

selectedLanguageArr = [];

Slected_Courses_by_Language_method(name, event){
  this.selectedLanguageArr = [];
  for(var i = 0 ; i<= this.AllLanguages.length-1;i++){ 
    if(event  == true &&  this.AllLanguages[i].name == name){
      this.AllLanguages[i].checked = true;
      this.selectedLanguageArr = [];
  }else if(event  == false &&  this.AllLanguages[i].name == name){
      this.AllLanguages[i].checked = false;
      this.selectedLanguageArr = [];
    }      
  }
  var TestResults = this.AllLanguages.filter(data => data.checked == true);
  for(var i = 0 ; i<TestResults.length;i++){
    this.selectedLanguageArr.push(TestResults[i].name);
  }
  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedLanguageName =  this.selectedLanguageArr || null;

    if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length >= 1){
      this.studentservice.filterbyLanguagewiseService(categoryName, SubCatName , TopicName , SelectedLanguageName).subscribe((response)=>{
        var course_cat_data =  response;
        var course_cat_list =   response;
      this.noOfvideos = course_cat_list;
  
      if( this.noOfvideos.length==0){
  
        // this.NoSearchResultMsg =  true;
        this.showIfSearchResults = false; 
        this.invalidSearch=true;
        this.afterInvalid=false;
        this.NofoundData = true; // no resuylts found
  
        this.hidePaginationDiv = false; // pagination Div
  
      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;
        this.NoSearchResultMsg =  false;
        this.showIfSearchResults = true; 
        this.NofoundData = false;
        this.hidePaginationDiv = false; // pagination Div
      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
      this.selectedLevelData.sort(function (a, b) {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
      if (this.selectedLevelData.length == 0) {
        this.showemptyCourses = true;
      } else {
        this.showemptyCourses = false;
      }
    
        // this.TestArr = [];
    }, (error)=>{
      console.log(error);
    });


    } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length >= 1){
      this.Slected_Courses_by_TopicName_and_language_method();
    } else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length >=1){
      this.Slected_Courses_by_Level_and_language_method();
    } else if(this.selectedTopicArr.length >=1 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length >= 1){
      this.Slected_Courses_by_TopicName_Level_and_language_method();
    }  else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){
      this.getCourseByCategoryOrSubCategoryOrTopicMethod();
    } else if(this.selectedTopicArr.length >= 1 && this.selectedLevelArr.length == 0 &&  this.selectedLanguageArr.length == 0){

      var SelectedTopicName  = this.selectedTopicArr;

      this.studentservice.filterbyTopicWiseService(categoryName, SubCatName , TopicName , SelectedTopicName).subscribe((response)=>{

        var course_cat_data =  response;
        var course_cat_list =   response;
      this.noOfvideos = course_cat_list;
      if( this.noOfvideos.length==0){

        // this.NoSearchResultMsg =  true;
        this.showIfSearchResults = false; 
        this.invalidSearch=true;
        this.afterInvalid=false;
        this.NofoundData = true; // no resuylts found

        this.hidePaginationDiv = false; // pagination Div

      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;
        this.NoSearchResultMsg =  false;
        this.showIfSearchResults = true; 
        this.NofoundData = false;
        this.hidePaginationDiv = false; // pagination Div
      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
      this.selectedLevelData.sort(function (a, b) {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
      if (this.selectedLevelData.length == 0) {
        this.showemptyCourses = true;
      } else {
        this.showemptyCourses = false;
      }
    
        // this.TestArr = [];
    }, (error)=>{
      console.log(error);
   
   
   
    });
     } else if(this.selectedTopicArr.length == 0 && this.selectedLevelArr.length >= 1 &&  this.selectedLanguageArr.length == 0){

      var SelectedLevelName = this.selectedLevelArr;

      this.studentservice.filterbyLevelwiseService(categoryName, SubCatName , TopicName , SelectedLevelName).subscribe((response)=>{
        var course_cat_data =  response;
        var course_cat_list =   response;
      this.noOfvideos = course_cat_list;
    
      if( this.noOfvideos.length==0){
  
        // this.NoSearchResultMsg =  true;
        this.showIfSearchResults = false; 
        this.invalidSearch=true;
        this.afterInvalid=false;
        this.NofoundData = true; // no resuylts found
  
        this.hidePaginationDiv = false; // pagination Div
  
      }else{
        this.invalidSearch=false;
        this.afterInvalid=true;
        this.NoSearchResultMsg =  false;
        this.showIfSearchResults = true; 
        this.NofoundData = false;
        this.hidePaginationDiv = false; // pagination Div
      }
      this.studentCourseResultLength = this.noOfvideos.length;
      this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
      this.selectedLevelData.sort(function (a, b) {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
      if (this.selectedLevelData.length == 0) {
        this.showemptyCourses = true;
      } else {
        this.showemptyCourses = false;
      }
    
        // this.TestArr = [];
    }, (error)=>{
      console.log(error);
    });
  
  
    }

//   if(this.selectedTopicArr != undefined ){

//   } else{

// }
}

// end sleced Courses by languages 




// selected Topic name and level

Slected_Courses_by_TopicName_and_level_method(){

  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedTopicName =  this.selectedTopicArr || null;
  var SelectedLevelName =  this.selectedLevelArr || null;

  this.studentservice.filterbyTopicNameAndLevelwiseService(categoryName, SubCatName , TopicName , SelectedTopicName,SelectedLevelName).subscribe((response)=>{

      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;
    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  })


}
// end Selected Topic name and level 

// selected Topic name and language
Slected_Courses_by_TopicName_and_language_method(){

  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedTopicName =  this.selectedTopicArr || null;
  var SelectedLanguageName =  this.selectedLanguageArr || null;
  this.studentservice.filterbyTopicNameAndLanguagewiseService(categoryName, SubCatName , TopicName , SelectedTopicName,SelectedLanguageName).subscribe((response)=>{

      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;
    if( this.noOfvideos.length==0){
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  });
}


// end selected Topic name and language


// selected level and language
Slected_Courses_by_Level_and_language_method(){

 
  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedlevelName =  this.selectedLevelArr || null;
  var SelectedLanguageName =  this.selectedLanguageArr || null;
  this.studentservice.filterbyLevelAndLanguagewiseService(categoryName, SubCatName , TopicName , SelectedlevelName,SelectedLanguageName).subscribe((response)=>{
   
      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;

   

    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  });



  // filterbyLevelAndLanguagewiseService
}
// end sleected level and language


// selected TopicName and level and Language 


Slected_Courses_by_TopicName_Level_and_language_method(){

  var categoryName = this.serachedCatValue || null;
  var SubCatName =  this.searchedSubCatValue || null;
  var TopicName = this.searchedTopicValue || null;
  var SelectedlevelName =  this.selectedLevelArr || null;
  var SelectedLanguageName =  this.selectedLanguageArr || null;
  var SelectedTopicName =  this.selectedTopicArr || null;

  this.studentservice.filterbyLevelAndLanguageAndTopicNamewiseService(categoryName, SubCatName , TopicName ,SelectedTopicName ,SelectedlevelName,SelectedLanguageName).subscribe((response)=>{
      var course_cat_data =  response;
      var course_cat_list =   response;
    this.noOfvideos = course_cat_list;

    if( this.noOfvideos.length==0){

      // this.NoSearchResultMsg =  true;
      this.showIfSearchResults = false; 
      this.invalidSearch=true;
      this.afterInvalid=false;
      this.NofoundData = true; // no resuylts found

      this.hidePaginationDiv = false; // pagination Div

    }else{
      this.invalidSearch=false;
      this.afterInvalid=true;
      this.NoSearchResultMsg =  false;
      this.showIfSearchResults = true; 
      this.NofoundData = false;
      this.hidePaginationDiv = false; // pagination Div
    }
    this.studentCourseResultLength = this.noOfvideos.length;
    this.selectedLevelData = this.removeOacademyUrl(course_cat_list);
    this.selectedLevelData.sort(function (a, b) {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    if (this.selectedLevelData.length == 0) {
      this.showemptyCourses = true;
    } else {
      this.showemptyCourses = false;
    }
  
      // this.TestArr = [];
  }, (error)=>{
    console.log(error);
  });



}


// filterbyLevelAndLanguageAndTopicNamewiseService



// end selcted Topicname  and level and lanuage 





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
    // this.route.navigate(['student/details', {sid: id, courseTitle: val}]);
    this.route.navigate(['/gotocart', {cid: id, courseTitle: val,
      cat:this.Categories,subcat:this.subCategories,subsubcat:this.TopicName}]);
  }


  test = "A";
  filterShowHide() {
    this.test = "B";
    this.showfilData = !this.showfilData;
  }

  AddwishlistDataArr=[]
  getWishListMethod(user_id){
    this.AddwishlistDataArr = [];
  var uid = sessionStorage.getItem('uid');
    // var userID = this.checkUserID;
      this.studentservice.getWishListService(user_id).subscribe((response)=>{
        if(response){
          if(response['status']== 200){
              var cart_course_data = response['data'];
              var wishlist_courses =   cart_course_data['wishlistcourses']
            //  this.getwishListArr =  this.removeOacademyUrlForCoverImage(wishlist_courses);
            //  this.whichAreinWishList = wishlist_courses;
          }
        }
      },(error)=>{
        setTimeout(() => {this.spinner.hide();}, 1000);
        if (error.status === 500) {
          this.toastr.error(error.error.message,'', {timeOut: 1000});
        }  else if (error.status === 400) {
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }   else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
        this.Authservice.invalidtokenAccress();
     } 
      else if(error.status == 404){
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }else if (error.status === 409) {
         this.toastr.error(error.error.message,'', {timeOut: 1000});
      }else if (error.status === 406) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      } else if(error.status ===  204 ){
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      } 
      
      })
  }



   // restrict to avoid F12

   restrictInspect(){
    // document.addEventListener("keydown", function(e) {
       document.onkeydown = function(e) {
        if(e.keyCode == 123) {
          console.log('You cannot inspect Element');
           return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
          console.log('You cannot inspect Element');
          return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
          console.log('You cannot inspect Element');
          return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
          console.log('You cannot inspect Element');
          return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
          console.log('You cannot inspect Element');
          return false;
        }
      } 
      // prevents right clicking
      document.addEventListener('contextmenu', e => e.preventDefault());
    
  }

  // end restrict to avoid F12




}
