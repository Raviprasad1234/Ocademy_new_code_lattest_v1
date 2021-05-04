import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;



import { DndDropEvent } from 'ngx-drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { combineAll } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ObservableService } from 'src/app/services/common/Observable-service';
import { SharingService } from 'src/app/services/common/passData.subject.service';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';



@Component({
  selector: 'app-course-maker-add-section',
  templateUrl: './course-maker-add-section.component.html',
  styleUrls: ['./course-maker-add-section.component.css']
})
export class CourseMakerAddSectionComponent implements OnInit {

  constructor(private router: Router,
    private Sharingservice : SharingService,
    private toastr: ToastrService,
    private Authservice : AuthService,
    private observableser : ObservableService,
     private activatedRoute: ActivatedRoute, 
     private hmservice: CourseMakerHomeService,
      private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    ) { }

  sec_modal_title = ''
  status: string = '';
  Addsection = "openSection";
  AddVideo = 'openvideoSection';
  title: any;
  sectiontitle:any;
  ShowSectionDragAndDrop = false;
  course_id = sessionStorage.getItem('cid') || 0

  updateCoursesDetailsForm : FormGroup;

  editLessonForm : FormGroup;

  getsectionID = '';
  course_info = {
    course_data: [      
    ],
    course_sections: 0,
    course_sessions: 0,
    course_lessons: 0
  }
  courseAdd:FormGroup;

  editSectionForm : FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.sectiontitle = sessionStorage.getItem('title');
    this.getSectiondata();
    var elmnt = document.getElementById("main");
    elmnt.scrollIntoView();

    this.activatedRoute.params.subscribe((dt: any) => {
      this.title = dt.selectedCourse
    });


    this.courseAdd = this.formBuilder.group({    
      user_name: ['', [Validators.required, 
        Validators.compose([Validators.required,Validators.pattern("^([-a-zA-Z!@#$%^&]+)+[^]+[-a-zA-Z\s0-9!@#$%^&]+([-a-zA-Z0-9!@#$%^&]+)*$")])]]
    });

    this.editSectionForm = this.formBuilder.group({    
      edit_section_name: ['', [Validators.required, 
        Validators.compose([Validators.required,Validators.pattern("^([-a-zA-Z]+)+[^]+[-a-zA-Z\s]*$")])]]
    });


    this.editLessonForm = this.formBuilder.group({    
      edit_lesson_name: ['', [Validators.required, 
        Validators.compose([Validators.required,Validators.pattern("^([-a-zA-Z]+)+[^]+[-a-zA-Z\s]*$")])]]
    });



   
  }





  onSubmit() {
    this.submitted = true;
    if(this.courseAdd.invalid){
      // this.toastr.warning('Please Enter Proper Section name')
      return;
    }else{
      this.add_section_promise().then((res) => {
        document.getElementById('addSection').click();
        this.getSectiondata();
        // this.courseAdd.reset();
        window.location.reload();
      });
    }
    }


  get f() { return this.courseAdd.controls; }


  get editcontrols() { return this.editSectionForm.controls; }

  get editlessoncontrols() { return this.editLessonForm.controls; }

  
  // add_section(content) {
  //   if (this.sec_modal_title == '') {
  //     this.toastr.warning('Please Enter Section name')
  //   } else {
  //     this.add_section_promise().then((res) => {
  //       $('#' + content).modal('hide')
  //       this.getSectiondata()
  //     });
  //   }
  // }



  add_section_promise(): Promise<any> {
    return this.hmservice.addSectionByCID(this.course_id, { name: this.courseAdd.controls.user_name.value }).toPromise()
  }
  all_lessions_Arr: any = [];

  getSectiondata() {
    this.all_lessions_Arr = [];
    this.spinner.show()
    this.hmservice.getSectiondata(this.course_id).subscribe((response) => {
        if(response){
          if(response['status'] == 200){
            var course_section_data = response['data'];
            var course_section_list = course_section_data['sectionList'];
            var sectionListLength =   course_section_data['sectionListLength'];
              course_section_list.forEach(element => {
                this.getLessonDataBysid(element['id']).then((data) => {
                  var lesson  = data['data'].lesson
                  element['lessons'] = data['data'].lessonList;
                } ).catch((error)=>{
                });
              });  
         

            setTimeout(() => {this.spinner.hide();}, 1000);
            this.course_info.course_data = course_section_list;
            for(var j = 0 ; j <=this.course_info.course_data.length-1; j++ ){
         
                this.course_info.course_data[j].lessonCount = this.course_info.course_data[j].lessions.length; 
            }

            var sec_id = sessionStorage.getItem('openSecID');
             for(var i = 0 ; i <=this.course_info.course_data.length-1; i++ ){
            if(this.sec_modal_title == this.course_info.course_data[i].name ||  sec_id ==  this.course_info.course_data[i].id ){
              this.course_info.course_data[i].isExpanded = true ;
            } else{
              this.course_info.course_data[i].isExpanded = false ;  
            }
         }
            // lesson and section count 
            this.course_info.course_sections = this.course_info.course_data.length;
            for (var i = 0; i <= this.course_info.course_data.length - 1; i++) {
              for (var j = 0; j <= this.course_info.course_data[i].lessions.length - 1; j++) {
                this.all_lessions_Arr.push(this.course_info.course_data[i].lessions[j].name);
              }
            }
            this.course_info.course_lessons = this.all_lessions_Arr.length;
      
            // end  lesson and section count 
      
            if (this.course_info.course_data == [] || this.course_info.course_data.length == 0) {
              this.ShowSectionDragAndDrop = true;
            } else {
              this.ShowSectionDragAndDrop = false;
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
   } 
    else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else{
	    this.toastr.error(error.error.message,'', {timeOut: 1000});
	}
    });
  }

  getLessonDataBysid(sid): Promise<any> {
    return this.hmservice.getLessondataBySID(sid).toPromise()
  }

  openModal(content) {
    this.sec_modal_title = this.get_new_section();
    $('#' + content).modal('show')
  }

  closeModal(content) {
    $('#' + content).modal('hide')
  }



  get_new_section() {
    var sec_name = 'Section ' + this.get_new_section_id()
    return sec_name;
  }

  get_new_section_id() {
    var sec_count = this.course_info['course_sections'] || 0
    return sec_count + 1;
  }

  goToCourseName(pth) {
    if(pth == 'pdf'){
      this.openPDfDropDown();
    }else if(pth == 'video'){
      this.openVideoSectionMethod();
      // this.router.navigate(['/coursemaker/video'], { state: { course_id: this.course_id, section_id: sid } });
    }else if(pth == 'pstatus'){
      this.openPublishStatusMethod();
    }else if(pth == 'settings'){
      this.openSettingsMethod();
    
    }else{
      this.router.navigate([pth], { relativeTo: this.activatedRoute });
    }

  }



  goback() {
    this.router.navigateByUrl('tutor/courses');
  }



  onClickOnEdit(ind, s_name) {
    this.Update_Section_Name = s_name;
    this.editSectionForm.get("edit_section_name").patchValue(this.Update_Section_Name);
    this.openModal('editSection_' + ind);
  }
  onClickOnDelete(ind) {
    this.openModal('deleteSection_' + ind);
  }

  onDragover(event: DragEvent) {
    this.status = "dragover";
  }

  onopenSectionDrop(event: DndDropEvent) {
    if (event.data == 'openSection') {
      // alert(event.data);
      this.openModal('addSection');
    } else {
      // this.toastr.error('Server Not respond','', {timeOut: 1000});
      this.toastr.error('You cannot drop here..', '', { timeOut: 1000 });
    }

    this.status = "ddropped";
  }

  onopenvideoDrop(s_data, event: DndDropEvent, names) {
    var sid = s_data['id'] || 0
    if (event.data == 'openvideoSection') {
      this.router.navigate(['/coursemaker/video'], { state: { course_id: this.course_id, section_id: sid } });
    } else {
      // this.toastr.error('Server Not respond','', {timeOut: 1000});
      this.toastr.error('You cannot drop here..', '', { timeOut: 1000 });
    }
  }


  openPDfDropDown(){
    // this.getSectiondata();

    if(this.course_info.course_data.length == 0 ||  this.course_info.course_data == null || this.course_info.course_data == undefined){
      this.toastr.warning('Please add section ..!','', {timeOut:1000}); 
      return;
    }

    var courseData = this.course_info['course_data'];
    this.observableser.sendSectionameObserService(courseData);    
    var sec_id = sessionStorage.getItem('openSecID');  
    console.log('sec_id', sec_id);  
    var issectionISopened = courseData.find(data => {
      return data.id == sec_id
    });

    this.getsectionID = sec_id;


    let ifSectionisExpaned = this.course_info.course_data.filter(function (e) {
      return e.isExpanded ==  true;
  });


  if(ifSectionisExpaned == undefined || ifSectionisExpaned.length == 0){
    this.toastr.warning('please expand section ..!','', {timeOut:1000}); 
  } else{
    this.router.navigate(['/coursemaker/pdf'], { state: { course_id: this.course_id, section_id: this.getsectionID } }); 
  }
 }


  openVideoSectionMethod(){

    console.log(this.course_info.course_data , "this.course_info.course_data");

    if(this.course_info.course_data.length == 0 ||  this.course_info.course_data == null || this.course_info.course_data == undefined){
      this.toastr.warning('Please add section ..!','', {timeOut:1000}); 
      return;
    }


    // this.getSectiondata();
    var courseData = this.course_info['course_data'];   
    
    var sec_id = sessionStorage.getItem('openSecID');  
    console.log('sec_id', sec_id);  
    var issectionISopened = courseData.find(data => {
      return data.id == sec_id
    });

    this.getsectionID = sec_id;


    let ifSectionisExpaned = this.course_info.course_data.filter(function (e) {
      return e.isExpanded ==  true;
  });

  console.log(ifSectionisExpaned , "ifSectionisExpaned");


  if(ifSectionisExpaned.length != 0){

    console.log("ifSectionisExpaned[0].isExpanded" , ifSectionisExpaned[0].isExpanded);
    this.router.navigate(['/coursemaker/video'], { state: { course_id: this.course_id, section_id: this.getsectionID  } }); 
  } else{
    this.toastr.warning('Please expand section ..!','', {timeOut:1000}); 
    console.log("ifSectionisExpaned[0].isExpanded " , ifSectionisExpaned);
  }



  //   for(var i = 0 ; i <=this.course_info.course_data.length-1; i++ ){
  //     if(this.course_info.course_data[i].isExpanded  == true){
  //       this.router.navigate(['/coursemaker/video'], { state: { course_id: this.course_id, section_id: this.getsectionID  } }); 

  //       console.log(this.course_info.course_data, "section data");
  //       return;
  //       // this.course_info.course_data[i].isExpanded = !this.course_info.course_data[i].isExpanded ;
  //     } else{
  //       this.toastr.warning('please expand section ..!','', {timeOut:1000}); 
  //       console.log(this.course_info.course_data, "after  section data")
  //     }

  //  }

  }


  openSettingsMethod(){

    // var sec_id = sessionStorage.getItem('openSecID');  
    // this.getsectionID = sec_id;

    this.router.navigate(['/coursemaker/settings'], { state: { course_id: this.course_id} });   
 
    debugger;
  }

  openPublishStatusMethod(){
    this.router.navigate(['/coursemaker/pstatus'], { state: { course_id: this.course_id } }); 
  }


delete_Lesson_modal_open_Method(ind, l_name){
    this.Update_Lesson_Name = l_name;
    this.openModal('delete_Lesson_' + ind);
  // delete_Lesson_
}


// this.closeModal('editLesson_' + inp_lid);
     



  del_lesson_func(inp_sid, inp_lid) {
    this.spinner.show()
    this.hmservice.deleteLessonBySIDLID(inp_sid, inp_lid).subscribe((response) => {
      if(response){
        if(response['status'] == 200){
          setTimeout(() => {this.spinner.hide();}, 1000);
          this.closeModal('delete_Lesson_' + inp_lid);
          this.toastr.success(response['message'], '', { timeOut: 1000 });
          this.getSectiondata();
          setTimeout(() => {this.spinner.hide();}, 1000);    
        }
      }
      // this.toastr.success('Succesfully deleted');
    }, (error) => {
      this.closeModal('delete_Lesson_' + inp_lid);
      setTimeout(() => {this.spinner.hide();}, 1000);    
      this.getSectiondata();
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

  del_section_func(inp_sid) {
    this.spinner.show()
    this.hmservice.deleteSectionByCIDSID(this.course_id, inp_sid).subscribe((response) => {
      if(response){
          if(response['status'] == 200){
            this.closeModal('deleteSection_' + inp_sid);
            this.toastr.success(response['message'], '', { timeOut: 1000 });    
            this.getSectiondata();
            setTimeout(() => {this.spinner.hide();}, 1000);
          }
      }
      }, (error) => {
      setTimeout(() => {this.spinner.hide();}, 1000);
      this.closeModal('deleteSection_' + inp_sid);
      this.getSectiondata();
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

  Update_Section_Name: any;

  edit_section_func(inp_sid, s_name) {
    var s_name = this.editSectionForm.value['edit_section_name']
    // this.UpdateSection_Name = s_name;
  
    if(s_name == ''){
      // this.toastr.warning('Please Enter Section name');
      return;
    }
    var s_data = { "name": s_name };
    this.spinner.show()
    this.hmservice.updateSectionByCourseIdAndSectioId(this.course_id, inp_sid, s_data).subscribe((response) => {
      if(response){
        if(response['status']== 200){
          setTimeout(() => {this.spinner.hide();}, 1000);
          this.closeModal('editSection_' + inp_sid);
          this.toastr.success(response['message'], '', { timeOut: 1000 });
          this.getSectiondata();    
        }
      }
    }, (error) => {
      setTimeout(() => {this.spinner.hide();}, 1000);
      this.closeModal('editSection_' + inp_sid);
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status == 404){
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }  else if (error.status === 401) {
      this.toastr.warning("Please Access with valid Token",'', {timeOut: 1000});
      this.Authservice.invalidtokenAccress();
   } else if (error.status === 409) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }else if (error.status === 406) {
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } else if(error.status ===  204 ){
      this.toastr.error(error.error.message,'', {timeOut: 1000});
    } 
       
      // this.getSectiondata()
    });
  }


  //  Update lesson name 



  onClickOnEditLesson(ind, l_name) {
    this.Update_Lesson_Name = l_name;
    this.editLessonForm.get("edit_lesson_name").patchValue(this.Update_Lesson_Name);
    this.openModal('editLesson_' + ind);
  }



  final=""; 
  res='';

  result(s) {
    this.final = '';
    for(var i=0;i<s.length;i++)
       {    
           if(!(this.final==""&&s[i]==" ")&&!(s[i]===" "&& s[i+1] ===" ")){ 
         this.final+=s[i]; 
          }
       }
    
   }

  Update_Lesson_Name: any;

  edit_lesson_func(inp_sid, inp_lid, l_name) {
    // var l_name = this.Update_Lesson_Name;
    // this.UpdateSection_Name = s_name;
    var l_name = this.editLessonForm.value['edit_lesson_name']
  
    if(l_name == ''){
      // this.toastr.warning('Please Enter Lesson name');
      return;
    } 
    this.final = '';
    for(var i=0;i<l_name.length;i++)
       {    
           if(!(this.final==""&&l_name[i]==" ")&&!(l_name[i]===" "&& l_name[i+1] ===" ")){ 
         this.final+=l_name[i]; 
          }
       }

     
      // avoidSpacess
    var l_data = { "name": this.final };
    this.spinner.show()
    this.hmservice.updateLessionBySectionIdAndLessionId(inp_sid, inp_lid, l_data).subscribe((response) => {
      if(response){
        if(response['status'] == 200){
          this.spinner.hide()
          this.closeModal('editLesson_' + inp_lid);
          this.toastr.success(response['message'], '', { timeOut: 1000 });
          this.getSectiondata();    
        }
      }
    }, (error) => {
      setTimeout(() => {this.spinner.hide();}, 1000);
      this.closeModal('editLesson_' + inp_lid);
      if (error.status === 500) {
        this.toastr.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toastr.error(error.error.message,'', {timeOut: 1000});
    }   else if (error.status === 401) {
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
    
      // this.getSectiondata()
    });
  };







  // end update lesson name 


  nav_to_VideoCourse(inp_sid, inp_lid) {
   
    for(var i = 0 ; i <=this.course_info.course_data.length-1; i++ ){
      if(inp_sid ==  this.course_info.course_data[i].id ){
          for(var j = 0 ; j<=this.course_info.course_data[i].lessions.length-1;j++ ){
            if(this.course_info.course_data[i].lessions[j].id== inp_lid){
              var checkfileType = this.course_info.course_data[i].lessions[j].fileName;
              var afterDot = checkfileType.substr(checkfileType.indexOf('.'));

              if(afterDot == '.mp4'){
                this.router.navigate(['/coursemaker/video'], { state: { course_id: this.course_id, section_id: inp_sid, lesson_id: inp_lid } });
              }else{
                this.router.navigate(['/coursemaker/pdf'], { state: { course_id: this.course_id, section_id: inp_sid, lesson_id: inp_lid } });
              }
            }
          }
      } else{
   
      }
   }


  }


  checkAccdianOpen(data) {
  
  }


  openCourseSectionStep(secID , expanded){

    console.log(expanded, "expanded");


    for(var i = 0 ; i <=this.course_info.course_data.length-1; i++ ){
      if(secID ==  this.course_info.course_data[i].id ){
        this.course_info.course_data[i].isExpanded = !this.course_info.course_data[i].isExpanded ;
      }
   }

   console.log(this.course_info.course_data);

      this.getsectionID = secID || 0;
      console.log(this.getsectionID, "this.getsectionID");
      sessionStorage.setItem('openSecID',this.getsectionID);
    }
    
}
