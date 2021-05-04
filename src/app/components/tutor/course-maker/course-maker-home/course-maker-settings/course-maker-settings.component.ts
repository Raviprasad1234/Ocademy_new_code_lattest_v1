import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';

@Component({
  selector: 'app-course-maker-settings',
  templateUrl: './course-maker-settings.component.html',
  styleUrls: ['./course-maker-settings.component.css']
})
export class CourseMakerSettingsComponent implements OnInit {

  sub:Subscription;
  settings_sub_tabs = [
    {
      name:'Course Update',
      path:'branding',
      active:false
    }
    // {
    //   name:'Price and Expiry',
    //   path:'pexpiry',
    //   active:false
    // }
    // ,
    // {
    //   name:'Destroy',
    //   path:'destroy.do',
    //   active:false
    // }
  ]
  sel_sub_tab = {}

  cid : any;
  lid : any;
  sid: any;
  // constructor(private router:Router, private activatedRoute:ActivatedRoute ) { }
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private  tutorservice : TutorServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
 if (this.router.getCurrentNavigation().extras.state) {
   this.cid = this.router.getCurrentNavigation().extras.state['course_id'];

   console.log(this.cid , "cid");

   this.sid = this.router.getCurrentNavigation().extras.state['section_id']
   if (this.router.getCurrentNavigation().extras.state['lesson_id']) {
     this.lid = this.router.getCurrentNavigation().extras.state['lesson_id']
   }
   if (!this.cid) {
     this.goback();
   }
 } else {
   this.goback()
 }
}



  ngOnInit() {
   this.snav_tabs_click(this.settings_sub_tabs[0]);
    this.sub = this.activatedRoute
      .data
      .subscribe(v => {
      });
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  actinactAllTabs(inp) {
    this.settings_sub_tabs.forEach(element => {
      element['active'] = inp
    });
  }
  snav_tabs_click(tb) {
    this.sel_sub_tab = tb
    this.actinactAllTabs(false)
    tb['active'] = 'true';
    // this.router.navigate([tb['path']])
       // this.router.navigate(['/coursemaker/video'],
        // { state: { course_id: this.course_id, section_id: sid } });
 
        if(tb['path'] == 'branding'){
          this.router.navigate(['/coursemaker/settings/branding'],
           { state: { course_id: this.cid, section_id: this.sid  } });   
        }else{
          this.router.navigate([tb['path']], { relativeTo: this.activatedRoute } );
        }

    
    // this.router.navigate([tb['path']], { relativeTo: this.activatedRoute }  , { state: { course_id: this.course_id, section_id: sid }  );
  }

  goback(){
    this.router.navigateByUrl('coursemaker');
  }

}
