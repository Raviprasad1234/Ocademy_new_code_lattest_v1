import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
import {MainFooterComponent} from './../main-footer/main-footer.component';
import {MainHomeHeaderComponent} from './../main-home-header/main-home-header.component';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-main-home-component',
  templateUrl: './main-home-component.component.html',
  styleUrls: ['./main-home-component.component.css']
})
export class MainHomeComponentComponent implements OnInit {

  AllTopicsform: FormGroup;


  constructor(private formBuilder: FormBuilder,
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
  ngOnInit(): void {

    //this.restrictInspect();

    // this.getAll();
    

    this.Alllevels = [
      { name: "All Levels" , ID:1 }, 
      { name: "Bigneers" ,ID:2},
      { name: "Intermediate" ,ID:3}, 
      { name: "Expert" ,ID:4 },
      { name: "Advanced" ,ID:5 }]
    this.AllLanguages = [
      { name: "English", IDs:1 },
      { name: "Hindi", IDs:2 },
      { name: "Telugu", IDs:3 },
      { name: "Spanish", IDs:4 },
      { name: "German", IDs: 5},
      { name: "Chinese", IDs: 6} 
     ]
    this.AllTopics = [
      { name: "Android Development" , id:1}, 
      { name: "IOS Development" , id:2}, 
      { name: "JavaScript" , id:3}, 
      { name: "Angular" , id:4}, 
      { name: "React" , id:5}, 
      { name: "Financial Analysis" , id:6}, 
      { name: "Google Adwards(Ad words)", id:7 },
      { name: "Internet Marketing" , id:8}, 
      { name: "Leadership", id: 9},
      { name: "Management Skills" , id:10}, 
      { name: "Email Marketing", id:11 },
      { name: "Google Flutter" , id:12}, 
      { name: "Swift" , id:13},]

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




  checkVideoPlayer(dat, i) {
    
    var url = dat['videourl'] || ''
    if (url) {
      $('#myModal' + i).modal('show')
      $("#loadIframe" + i).attr('src', url);
    }

  }


  selectedLevelData: any;

  onChangeTopic(name, event) {
    if (event == false) {
      // this.selectedLevelData = [];
      this.getAll();
    } else {
      this.tutorservice.getAllTopics(name).subscribe((res) => {

      
        if (res) {
          this.selectedLevelData = res;
        }
      }, (error)=>{
         this.toastr.error('Server Not respond','', {timeOut: 1000});
      });
    }

  }

  getAll() {
    var userid = sessionStorage.getItem('uid');
  
    this.tutorservice.getVideoAllMethod().subscribe((res) => {
      if (res) {
        this.selectedLevelData = res;
      }
    }, (error)=>{
       this.toastr.error('Server Not respond','', {timeOut: 1000});
  
    })
  }


  onChangeLevel(name, event) {
    if (event == false) {
      // this.selectedLevelData = [];
      this.getAll();
    } else {
      this.tutorservice.getAllLevelsData(name).subscribe((res) => {
        if (res) {
          this.selectedLevelData = res;
        }
      }, (error)=>{
        this.toastr.error('Server Not respond','', {timeOut: 1000});
      });
    }

  }


  onChangeLanguages(name, event) {
    if (event == false) {
      // this.selectedLevelData = [];
      this.getAll();
    } else {
      this.tutorservice.getAllLanguages(name).subscribe((res) => {

        

        if (res) {
          this.selectedLevelData = res;
        }
      }, (error)=>{
        this.toastr.error('Server Not respond','', {timeOut: 1000});
    });
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
    this.showbtnArrowLang= !this.showbtnArrowLang;
  }

  showbtnArrowPrice = true;
  showPriceMethod() {
    this.showPriceToggle = !this.showPriceToggle;
    this.showbtnArrowPrice = !this.showbtnArrowPrice
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
