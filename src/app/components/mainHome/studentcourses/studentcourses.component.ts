import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { StudentService } from 'src/app/services/student/student.service';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';

declare var $: any;

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CompileMetadataResolver } from '@angular/compiler';

import { PdfViewerComponent } from 'ng2-pdf-viewer';

import {Location} from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-studentcourses',
  templateUrl: './studentcourses.component.html',
  styleUrls: ['./studentcourses.component.css']
})
export class StudentcoursesComponent implements OnInit {

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  course_id: any;
  course_title: any;
  sections_data: any;
  showEmptey: boolean = false;
  videosrc: any = '';
  lessonsobj: any = [];
  AllCoursesData = [];
  windowloc : any;
  shareUrl = '';
  navUrl = '';
  videoItems = [
    {
      name: 'Video one',
      src: 'https://d1fss4769yyo8u.cloudfront.net/testingjavascript.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src: 'https://d1fss4769yyo8u.cloudfront.net/testingjavascript.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src: 'https://d1fss4769yyo8u.cloudfront.net/testingjavascript.mp4',
      type: 'video/mp4'
    }
  ];
  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data;

  loadingVideobasedonlessonOne: any;
  firstlessonvideo: any = '';


  @ViewChild('videoPlayer') videoplayer: ElementRef;

  Url : SafeUrl;

  constructor(private router: ActivatedRoute, 
     private formBuilder: FormBuilder,
     private Studentservice : StudentService,
     private toster : ToastrService,
    private homerouter: Router,
    private sanitizer: DomSanitizer,
    private _location: Location,
    private Authservice : AuthService,
    private CoursemakerHomeservice: CourseMakerHomeService,
    private spinner: NgxSpinnerService) {
  

      this.router.params.subscribe((params: Params) => {
        if(params){
          this.course_id = params.sid;
          this.course_title = params.courseTitle;  
        }else{
          this.goback();
        }
      });


    //   if (this.homerouter.getCurrentNavigation().extras.state) {
    //   this.course_id = this.homerouter.getCurrentNavigation().extras.state['sid']
    //   this.course_title = this.homerouter.getCurrentNavigation().extras.state['courseTitle']
    //   if (!this.course_id || !this.course_title) {
    //     this.goback()
    //   }
    //   else if(sessionStorage['course_id'] != null || sessionStorage['course_title'] != null){
    //     this.goback()
    //   }else if(this.course_id && this.course_title){
    //     sessionStorage['course_id'] = this.course_id
    //     sessionStorage['course_title'] = this.course_title    
    //     this.getAllCoursesBycourseID();
    //   }else{
    //     this.course_id = sessionStorage['course_id']
    //     this.course_title = sessionStorage['course_title']
    //     this.getAllCoursesBycourseID();
    //   }
      
    // }else if(sessionStorage['course_id'] != null && sessionStorage['course_title'] != null){
    //   this.course_id = sessionStorage['course_id']
    //   this.course_title = sessionStorage['course_title']
    //   this.getAllCoursesBycourseID();
    // } 
    // else {
    //   this.goback()
    // }
  }


  submitted = false;

  ratingFeedbackForm : FormGroup;

  ngOnInit(){
    this.shareCourse();
    this.avoidspaceBarmethod();
    this.getAllCoursesBycourseID();
    this.ratingFeedbackForm = this.formBuilder.group({
      rating: [''],

      feedback: ['', [Validators.compose([
        Validators.pattern("^([-a-zA-Z0-9!@#$%^&]+)+[^]+[-a-zA-Z\s0-9!@#$%^&]+([-a-zA-Z0-9!@#$%^&]+)*$")])]]       

      // feedback : ['', Validators.required]
      });
      //this.restrictInspect();
  }

  get f() { return this.ratingFeedbackForm.controls; }


  totalPages: number;
  page: number = 1;
  isLoaded: boolean = false;


  showpdfnextbtnmethod(){
    if(this.totalPages <=  this.page){
      return;
   } else{
    this.page += 1;      
   }
  }
  showpdfpreviousbtnmethod(){
    if(this.page == 1){
        return;
    }
      this.page -= 1;
  }


     nextPage() {
    }


      previousPage() {
      }

      afterLoadComplete(pdfData: any) {
        this.totalPages = pdfData.numPages;
        this.isLoaded = true;
      }







  getallsection() {
    this.spinner.show()
    this.CoursemakerHomeservice.getSectiondata(this.course_id).subscribe((res) => {

      res.forEach(element => {
        this.getLessonDataBysid(element['id']).then((lesson) => {
          element['lessons'] = lesson
          // this.videosrc = this.removeOacademyUrl(element['lessons'][0].fileUrl)
        });
      });

      this.spinner.hide()
      this.sections_data = res
  
      this.lessonsobj.forEach(function (value) {
      });

    }, (error) => {
      console.error('error', error)
      this.spinner.hide()
  
    });
  }


  playlessonvideo(val) {
    this.videosrc = this.removeOacademyUrl(val)
  }

  removeOacademyUrl(data) {
    data = data.split('oacademy/').join('')
    return data
  }



  removeCoverImageOacademyUrl(data) {
    data = data.split('oacademy/').join('')
    return data
  }

  getLessonDataBysid(sid): Promise<any> {
    return this.CoursemakerHomeservice.getLessondataBySID(sid).toPromise()
  }

  getLessons() {
    this.CoursemakerHomeservice.getLessondataBySID(this.course_id)
  }

  pdfSource : any= '';
  getAllCoursesBycourseID() {
    this.AllCoursesData = [];
    this.loadingVideobasedonlessonOne = '';
    this.firstlessonvideo ='';
    this.CoursemakerHomeservice.getAllCoursesLessonsBasedOnCourseID(this.course_id).subscribe(response => {

      if(response){
      if(response['status'] == 200){
        var course_data = response['data'];
        var course_data_list = course_data['courseList'];
        var paticular_course_data =   course_data['course'];
        // this.AllCoursesData  = course_data_list;
        this.AllCoursesData.push(paticular_course_data);
      for(var i = 0 ; i<= paticular_course_data['sections'].length-1;i++ ){
          for(var j =0 ; j<= paticular_course_data['sections'][i].lessions.length-1;j++){
            this.loadingVideobasedonlessonOne = paticular_course_data['sections'][0].lessions[0].fileUrl;
             var  checklessontype = paticular_course_data['sections'][0].lessions[0].fileName;
            if(checklessontype == '.pdf'){
                      this.checkpDFview = this.removeCoverImageOacademyUrl(this.loadingVideobasedonlessonOne);
                      this.isPdfLessonView  = true;
                      this.isVideoLessonView  = false;
              //         // this.checkpDFview =   checkselectedpdffile;
              //         // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(checkpdffile);
              //         // this.pdfSource   =  this.Url; 
        
                   }else{    
                    this.firstlessonvideo = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);
                    this.isPdfLessonView  = false;
                    this.isVideoLessonView  = true;
                 }
          }
      }





      // for (var i = 0; i <= this.AllCoursesData.length - 1; i++) {
      //   for (var j = 0; j <= this.AllCoursesData[i].sections.length - 1; j++) {
      //     for (var k = 0; k <= this.AllCoursesData[i].sections[j].lessions.length - 1; k++) {
      //       this.loadingVideobasedonlessonOne = this.AllCoursesData[i].sections[j].lessions[0].fileUrl;
      //        var  checklessontype = this.AllCoursesData[i].sections[j].lessions[0].fileName;
      //       if(checklessontype == '.pdf'){
      //         this.checkpDFview = this.removeCoverImageOacademyUrl(this.loadingVideobasedonlessonOne);
      //         this.isPdfLessonView  = true;
      //         this.isVideoLessonView  = false;
      //         // this.checkpDFview =   checkselectedpdffile;
      //         // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(checkpdffile);
      //         // this.pdfSource   =  this.Url; 

      //      }else{    
      //       this.firstlessonvideo = this.removeOacademyUrl(this.loadingVideobasedonlessonOne);
      //       this.isPdfLessonView  = false;
      //       this.isVideoLessonView  = true;
      //      }
         
      //     }
      //   }
      // }

    }
  }
    }, (error) => {
      setTimeout(() => {this.spinner.hide();}, 1000);
      if (error.status === 500) {
        this.toster.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toster.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status == 404){
       this.toster.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toster.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toster.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toster.error(error.error.message,'', {timeOut: 1000});
    }
    
    })
  }


  checkpDFview :any = '';

  isPdfLessonView  = false;
  isVideoLessonView  = false;
  checklessonindex = '';
  checklessonVideoClasses(fileName ,fileurl, lessonindex, lid) {
    this.firstlessonvideo = '';

    var afterDot = fileName.substr(fileName.indexOf('.'));

    if(afterDot == '.pdf'){

      //  this.pdfSource   = this.removeCoverImageOacademyUrl(fileurl);
      
      var checkselectedpdffile = this.removeCoverImageOacademyUrl(fileurl);
    
      this.checkpDFview=   checkselectedpdffile;      
        // this.checkpDFview =   "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
        this.isPdfLessonView  = true;
        this.isVideoLessonView  = false;
 
        
    }else{
      this.firstlessonvideo = this.removeOacademyUrl(fileurl);
      this.isPdfLessonView  = false;
      this.isVideoLessonView  = true;

    }


    var video = document.getElementById('vplayer_1');
    var source = document.getElementById('s1');
    // video.load();
    // video.play();
    this.checklessonindex = lessonindex;
    // alert(lessonindex);
   





    // source.setAttribute('src', 'firstlessonvideo');

    for (var i = 0; i <= this.AllCoursesData.length - 1; i++) {
      for (var j = 0; j <= this.AllCoursesData[i].sections.length - 1; j++) {
        for (var k = 0; k <= this.AllCoursesData[i].sections[j].lessions.length - 1; k++) {
          if (this.AllCoursesData[i].sections[j].lessions[k].id == lid) {
            this.AllCoursesData[i].sections[j].lessions[k].checked = true;
          } else {
            this.AllCoursesData[i].sections[j].lessions[k].checked = false;
          }
        }
      }
    }
  }


  //   toggleVideo(event: any) {
  //     this.videoplayer.nativeElement.play();
  // }


  videoPlayerInit(data) {
    this.data = data;

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.pausethevideo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }

    this.currentVideo = this.videoItems[this.activeIndex];
  }

  pausethevideo() {
    // this.data.play();
    this.data.pause();
  }

  playthevideo(){
    this.data.play();
  }




  public videoJsConfigObj = {
    preload: "metadata",
    controls: true,
    autoplay: true,
    overrideNative: true,
    techOrder: ["html5", "flash"],
    html5: {
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
        hls: {
            withCredentials: false,
            overrideNative: true,
            debug: true
        }
    }
};


logError(error) {
  console.error(error , "error--");
}



  startPlaylistVdo(item, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
  gotohome() {
    this.homerouter.navigate(['/student']);
  }
  goback() {
    this._location.back();
    // this.homerouter.navigate(['student']);
    sessionStorage.removeItem('course_id');
    sessionStorage.removeItem('course_title');
  }


  gobacktoStuMathod(){
    this.homerouter.navigate(['/student']);
  }


  showdiv = true;
  courseHide = false;
  hidecontent() {
    this.showdiv = false;
    this.courseHide = true;
    this.showpdfpreviousbtn = true;
    this.showpdfnextbtn = true;
    this.showpdfnextbtn1 = true;
    this.showpdfpreviousbtn1 = true;   
  }

  showcourse() {
    this.showdiv = !this.showdiv;
    this.courseHide = !this.courseHide;
    this.showpdfnextbtn = false;
    this.showpdfpreviousbtn = false;
    this.showpdfnextbtn1 = false;
    this.showpdfpreviousbtn1 = false;   
  }


  showpdfnextbtn = false;
  showpdfpreviousbtn = false;

  showpdfnextbtn1 = false;
  showpdfpreviousbtn1 = false;


  
  openShareCourse() {
    this.openModal('openshareModal');
  }


  // openShareCourse(title,id) {
  //   this.course_title=title;
  //   this.course_id=id;
  //   this.openModal('openshareModal');  
  //   this.shareCourse()
  // }


  openModal(content) {
    $('#' + content).modal('show');
  }

  closeModal(content) {
    $('#' + content).modal('hide')
  }



  shareCourse(){
    this.windowloc  =  window.location.origin;
    this.shareUrl = `${this.windowloc + '/'+'gotocart;'+'cid='+this.course_id+ ';'+'courseTitle='+this.course_title+';'}` 
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

  copycdk(value) {
    return `${value}`
  }


  stars = [1, 2, 3, 4, 5];
  selected: number;
  hover: number;

  LeaveRatingMethod(course_title){
    this.openRatingModal('opensLeaveRatingModal');
  }


  openRatingModal(content) {
    $('#' + content).modal('show');
  }

  closeRatingModal(content) {
    $('#' + content).modal('hide')
  }
  
  selectedValue: number = 0;
  showRatingMsg = "Select Rating"
  
  showrevieweditorDiv = false;

  countStar(star) {
    this.showrevieweditorDiv = true;
    this.selectedValue = star;

    this.ratingFeedbackForm.patchValue({
      rating: star
    });
     if(star == 0){
      this.showRatingMsg = "Select Rating"
     }else if(star == 1){
      this.showRatingMsg = "Awful, not what I expected at all";
    } else if(star == 2){
      this.showRatingMsg = "Poor, pretty disappointed"
    } else if(star == 3){ 
        this.showRatingMsg = "Average, could be better"
    }else if(star == 4){   
        this.showRatingMsg = "Good, what I expected"
    } else{ 
        this.showRatingMsg = "Amazing, above expectations!"
    }
  }

  hidetheReviewContent(){
    this.showrevieweditorDiv = false; 
    this.selectedValue = 0;
  }

  revieweditorText = '';


  RatingObj = {};

  onSubmit() {
    // stop here if form is invalid
    this.submitted = true;
    if (this.ratingFeedbackForm.invalid) {
        return;
    }


    this.RatingObj['ratingType'] = this.ratingFeedbackForm.value['rating'];
    this.RatingObj['comment'] = this.ratingFeedbackForm.value['feedback'];
  


    var C_id = this.course_id;

    this.Studentservice.CreateCourseRatingByCourseID( C_id ,  this.RatingObj).subscribe(response=>{
          this.spinner.show();
          if(response){
              if(response['status'] == 200  || response['status'] == 201){
                setTimeout(() => {this.spinner.hide();}, 1000);
                var levedRating = response['data'];
                this.closeModal('opensLeaveRatingModal');
                this.toster.success(response['message'] , '' ,{timeOut: 1000});
                this.ratingFeedbackForm.reset();
                this.selectedValue = 0; 
              }
              }
    }, (error)=>{
      setTimeout(() => {this.spinner.hide();}, 1000);
      if (error.status === 500) {
        this.toster.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toster.error(error.error.message,'', {timeOut: 1000});
    }  else if (error.status === 401) {
      this.toster.warning("Please Access with valid Token",'', {timeOut: 1000});
      this.Authservice.invalidtokenAccress();
   }  else if(error.status == 404){
       this.toster.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toster.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toster.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toster.error(error.error.message,'', {timeOut: 1000});
    } 
       
});
    
    // display form values on success
  

}


closeShareAlertIcon(){
  document.getElementById('openshareModal').click();
}

checkVideoID : any;
playpausechecked = false;
openvideoControls(event){
  if( event.keyCode === 32){
    event.preventDefault();
    if(this.data!==undefined){
      this.playpausechecked = !this.playpausechecked
    }
    if(this.playpausechecked){
      this.playthevideo();  
    }else{
      this.pausethevideo();
    }
  }
}


avoidspaceBarmethod(){

  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

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
