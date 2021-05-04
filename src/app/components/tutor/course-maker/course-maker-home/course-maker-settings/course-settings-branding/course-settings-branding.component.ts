import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';


import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';


@Component({
  selector: 'app-course-settings-branding',
  templateUrl: './course-settings-branding.component.html',
  styleUrls: ['./course-settings-branding.component.css']
})
export class CourseSettingsBrandingComponent implements OnInit {

 

  cid : any;
  sid : any;
  lid : any;
    constructor(private router: Router,
         private formBuilder: FormBuilder,
         private activatedRoute: ActivatedRoute,
         private  tutorservice : TutorServiceService,
         private Authservice : AuthService,
         private toastr: ToastrService,
         private spinner: NgxSpinnerService) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cid = this.router.getCurrentNavigation().extras.state['course_id'];

        console.log(this.cid, "this.cid");

        this.sid = this.router.getCurrentNavigation().extras.state['section_id']
        if (this.router.getCurrentNavigation().extras.state['lesson_id']) {
          this.lid = this.router.getCurrentNavigation().extras.state['lesson_id']
        }
        if (!this.cid) {
          this.goback()
        }
      } else {
        this.goback()
      }
    }
  


goback(){

}
  public files: NgxFileDropEntry[] = [];


  htmlContent: any = '';

  SettingUpdatesForm: FormGroup;
  submitted = false;
  showfiletypeError = false;
  showerrorDiv = false;
  isDisabled: boolean = false;

  sectiontitle : any;
  Course_Name_Value:any;
  Requirements_text : any;
  ngOnInit(): void {

    this.SettingUpdatesForm = this.formBuilder.group({
      courseTitle: ['', [Validators.required, Validators.compose([Validators.required, Validators.maxLength(60)])]],
      ShortDescription: [''],
      LongDescription : [''],
      uploadfile: [''],
      fileSource: [''],
    });
    this.sectiontitle = sessionStorage.getItem('title');
    this.Course_Name_Value=this.sectiontitle;
    // this.Requirements_text = 

    this.getalldetailsAutofileMethodbycourseId();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem !important',
    minHeight: '25rem !important',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [['bold', 'italic'],
    ['fontSize']],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };



  get f() { return this.SettingUpdatesForm.controls; }

  myFiles : any;
  isValid = false;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => { 
      // if(file.type ==  "video/mp4"  || file.type ==  "video/ogg"){
          this.myFiles.push(file);     
          this.isValid = false;    
        // }else{
          // this.tstr.warning('Unsupported Format..');
          return;
        // }

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
 
  LongDescription_text  :any;

  getalldetailsAutofileMethodbycourseId(){
    var courseid = this.cid;
    this.tutorservice.getCourseByCourseIdService(courseid).subscribe((response)=>{
      if(response['status'] == 200){
          var data = response['data'];
          var tutor_course = data['course'];
          this.Requirements_text = tutor_course['shortDescription'];
          this.LongDescription_text = tutor_course['description'];
      }

    },(error)=>{
      console.log(error);
    });
  }






  f_name : any = "";

  onFileChanged(event) {
    this.isDisabled = false;
    if (event.target.files.length > 0) {
      // const file = event.target.files[0];
      //  var inp_file = event.target.files[0];
      //  this.f_name = inp_file['name'].split(' ').join('');
     

       if(event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/gif"){
     
        const file = event.target.files[0];
        var inp_file = event.target.files[0];
        this.f_name = inp_file['name'].split(' ').join(''); 
     
       this.showfiletypeError = false;
         this.showerrorDiv = false;
         // this.selectedVideo = event.target.files;
         this.SettingUpdatesForm.patchValue({
           fileSource: file
         });

        } else{
         this.showfiletypeError = true;
         this.showerrorDiv = false;
         return;   
       }
 



      //  this.SettingUpdatesForm.patchValue({
      //   fileSource: file
      // });  
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
      //   // this.selectedVideo = event.target.files;
      //   this.SettingUpdatesForm.patchValue({
      //     fileSource: file
      //   });
      // }


      // this.CategoriesVideoForm.setValue({
      //   fileSource: file
      // });


    }
  }



  UploadCoverImage() {
    if (this.SettingUpdatesForm.get('fileSource').value == null ||
      this.SettingUpdatesForm.get('fileSource').value == "" || this.SettingUpdatesForm.get('fileSource').value == undefined) {
      this.showerrorDiv = true;
      this.showfiletypeError = false;
      return;
    } else {
      this.showerrorDiv = false;
      // this.spinner.show()
      var formdata = new FormData();

      // formdata.append('image', this.registerForm.get('fileSource').value);
      // var f_name = inp_file['name'].split(' ').join('');
      formdata.append('file', this.SettingUpdatesForm.get('fileSource').value , this.f_name);
      // formdata.append('file', this.selectedVideo);
      // formdata.append('filename', this.selectedVideo.name);

      this.tutorservice.postUploadVideo(formdata).subscribe((data: any) => {
        // this.spinner.hide();
        if (Array.isArray(data)) {
          if (!data.length) {
            return
          }
        }
        this.toastr.success('Cover Image uploaded..!','', {timeOut: 1000});
        this.isDisabled = true;
        setTimeout(() => {
          // this.spinner.hide();
        }, 1000);
        this.postData['coverImageUrl'] = data['fileUrl'] || '';
        // Swal.fire('Success!', 'video Uploaded Successfully..!', 'success');


      }), (error) => {
        var errorMsg = error
        // Swal.fire('error!', errorMsg, 'error')
        // this.spinner.hide();
        this.toastr.error('Cover Image not uploaded..');
        this.isDisabled = false;
        setTimeout(() => {
          // this.spinner.hide();
        }, 3000);

      };
    }
  }




  

  postData = {};

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  // submitSettingFormMethod(){
  //   this.submitted = true;
  //     if (this.SettingUpdatesForm.get('fileSource').value == null || this.SettingUpdatesForm.get('fileSource').value == "" || this.SettingUpdatesForm.get('fileSource').value == undefined) {
  //       this.showerrorDiv = true;
  //     }
    
  //     if (this.SettingUpdatesForm.invalid) {
  //       return;
  //     }
  //     this.postData['courseTitle'] = this.SettingUpdatesForm.value['courseTitle'];
  //     this.postData['shortDescription'] = this.SettingUpdatesForm.value['ShortDescription'];
  //     this.postData['description'] = this.SettingUpdatesForm.value['LongDescription'];
  //     this.updateCourseDetailsMethod(this.postData);
  //   }


    submitSettingFormMethod(){
      if(this.SettingUpdatesForm.invalid){
        return
      }else{

     
      this.submitted = true;
  
      // if(this.SettingUpdatesForm.invalid ||  this.SettingUpdatesForm.get('fileSource').value == "" || this.SettingUpdatesForm.get('fileSource').value == undefined){
      //   this.toastr.warning("Please Enter All Details")
      // }else{
        this.postData['courseTitle'] = this.SettingUpdatesForm.value['courseTitle'];

        this.postData['shortDescription'] = this.SettingUpdatesForm.value['ShortDescription'];
        this.postData['description'] = this.SettingUpdatesForm.value['LongDescription'];
        this.updateCourseDetailsMethod(this.postData);
      // }
        if (this.SettingUpdatesForm.get('fileSource').value == null || this.SettingUpdatesForm.get('fileSource').value == "" || this.SettingUpdatesForm.get('fileSource').value == undefined) {
          // this.showerrorDiv = true;
        }
      }
      }


  

    updateCourseDetailsMethod(data){
        this.spinner.show();
        // var userid = sessionStorage.getItem('uid');
        var courseid = this.cid;
        this.tutorservice.TutorSettingUpdateService(courseid , data).subscribe(response => {
          if(response){
            if(response['status']== 200){
              var course_data = response['data'];
              var updated_course_data = course_data['updatedCourse'];

              console.log(updated_course_data , "updated_course_data");

              // this.SettingUpdatesForm.patchValue({
              //   ShortDescription: updated_course_data['shortDescription']
              // });
 

              this.router.navigateByUrl('/coursemaker');




              var updated_course_title =   updated_course_data.courseTitle
              sessionStorage.setItem('title', updated_course_title);
              // this.router.navigate(['/coursemaker']);
              setTimeout(() => {
                this.spinner.hide();
                this.onReset();
                // this.toastr.success('Course has been created successfully..!');
                this.toastr.success(response['message'],'', {timeOut: 1000});
                //this.snav_tabs_click(this.stab);
                // this.router.navigate(['/search']);
                // this.getAll();
              }, 1000);          
            }
          } 
          // this.TosaveData = true;
        }, (error) => {
          this.spinner.hide();
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
    



  onReset() {
    this.submitted = false;
    this.SettingUpdatesForm.reset('');
    this.isDisabled = false;
    this.SettingUpdatesForm = this.formBuilder.group({
      courseTitle: ['', [Validators.required, Validators.compose([Validators.required, Validators.maxLength(60)])]],
      ShortDescription: ['', Validators.required],
      LongDescription : ['', Validators.required],
      uploadfile: [''],
      fileSource: ['']
    });
     this.myInputVariable.nativeElement.value = '';
  }
}
