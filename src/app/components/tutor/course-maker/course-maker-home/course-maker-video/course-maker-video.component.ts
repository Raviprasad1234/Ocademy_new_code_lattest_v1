import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
declare var $: any;

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-maker-video',
  templateUrl: './course-maker-video.component.html',
  styleUrls: ['./course-maker-video.component.css']
})
export class CourseMakerVideoComponent implements OnInit {

  l_name = ''
  cid = 0
  sid = 0
  lid = 0
  lesson_data = []

  open_url = ''
  sectiontitle: any;

  isBtnSave = false;
  public files: NgxFileDropEntry[] = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private hmservice: CourseMakerHomeService,
    private Authservice: AuthService,
    private tstr: ToastrService,
    private tutorservice: TutorServiceService,
    private spinner: NgxSpinnerService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.cid = this.router.getCurrentNavigation().extras.state['course_id']
      this.sid = this.router.getCurrentNavigation().extras.state['section_id']
      this.gethesectionameServiceMethod();
      if (this.router.getCurrentNavigation().extras.state['lesson_id']) {
        this.lid = this.router.getCurrentNavigation().extras.state['lesson_id'];
      }
      if (!this.cid || !this.sid) {
        this.goback()
      }
    } else {
      this.goback()
    }
  }


  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;


  ngOnInit(): void {
    this.sectiontitle = sessionStorage.getItem('title');
    this.getSectiondata();
    //this.restrictInspect();
  }



  isValid = true;
  goback() {

    if (this.isapiloading == true) {
      return;
    } else {
      this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    }

    // this.router.navigateByUrl('coursemaker');
  }



  // video drag and drop event 


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type == "video/mp4") {
            this.myFiles.push(file);
            this.isValid = false;
            this.hideSelectFileHere = false;
          } else {
            this.tstr.warning('Unsupported Format..');
            return;
          }

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  SelectedsectionName: any = '';

  gethesectionameServiceMethod() {
    var cid = this.cid;
    this.hmservice.getSectiondata(cid).subscribe((response) => {
      var sec_id = sessionStorage.getItem('openSecID');
      if (response) {
        var data = response['data'];
        var sectionData = data['sectionList'];
        for (var i = 0; i <= sectionData.length - 1; i++) {
          if (sectionData[i].id == sec_id) {
            this.SelectedsectionName = sectionData[i].name;
          }
        }

      }

    }, (error) => {
      console.log(error);
    })

  }










  public fileOver(event) {
  }

  public fileLeave(event) {
  }

  // end video drag and drop 

  myFiles: any[] = [];
  sMsg: string = '';

  hideSelectFileHere = true;

  showUploadSpinner = false;

  uploadingResponse: any;


  isapiloading = false;

  // [disabled]="!isapiloading"

  getFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].type == "video/mp4") {

        var fsize = e.target.files[i].size;
        var filesizeinMb = parseInt((fsize / 1048576).toFixed(2));

        if (filesizeinMb >= 900) {
          this.tstr.warning(' Video size cannot exceed 900 MB..!')
          return;
        } else {
          this.isapiloading = true;
          this.showUploadSpinner = true;
          this.isValid = false;
          this.showvideodiv = true;
          this.myFiles.push(e.target.files[i]);
          this.hideSelectFileHere = false;
          // this.spinner.show();
          var formdata = new FormData();
          var inp_file = this.myFiles[0];
          var f_name = inp_file['name'].split(' ').join('');
          formdata.append('file', inp_file, f_name);
          this.tutorservice.postUploadVideo(formdata).subscribe((data: any) => {
            this.showvideodiv = false;
            this.isBtnSave = true;
            this.isapiloading = false;
            // upload video 
            this.uploadingResponse = data;
            this.showUploadSpinner = false;
            // this.createVideoLesson(data)
          }), (error) => {
            this.isapiloading = false;
            this.showUploadSpinner = false;
            this.isapiloading = false;
            this.hideSelectFileHere = true;
            this.isValid = true;
            e.target.value = ""
            this.tstr.error('error in video uploading...');
          };
        }
        // end upload video 
      } else {
        this.hideSelectFileHere = true;
        this.isValid = true;
        e.target.value = ""
        this.tstr.warning('Unsupported Format..');
        this.isapiloading = false;
        this.showUploadSpinner = false;
        return;
      }

      //  if(e.target.files[i].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      //   this.tstr.warning('Unsupported Format Uploaded..');
      //    return;
      //  }else if(e.target.files[i].type ==   "image/png"){
      //   this.tstr.warning('Unsupported Format Uploaded..');
      //     return;
      //  }else if(e.target.files[i].type =="text/plain"){
      //   this.tstr.warning('Unsupported Format Uploaded..');
      //     return
      //  }else if(e.target.files[i].type =="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      //   this.tstr.warning('Unsupported Format Uploaded..');
      //     return
      //  }else if(e.target.files[i].type =="image/gif"){
      //   this.tstr.warning('Unsupported Format Uploaded..');
      //     return
      //  }

    }

    e.target.value = ""

  }

  uploadFiles() {
    const frmData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }
  }

  uploadimage() {
    document.getElementById('file-chooser').click();
  }

  seconduploadfun() {
    document.getElementById('secondupload').click();
  }

  @ViewChild('fileUploader') fileUploader: ElementRef;

  showvideodiv = false;
  deletevideo() {
    this.fileUploader.nativeElement.value = null;
    this.myFiles = [];
    this.isValid = true;
    this.hideSelectFileHere = true;
    this.isBtnSave = false;
    // this.showvideodiv = true;
  }

  uploadVideo() {

    if (!this.myFiles.length) {
      this.tstr.warning('Please select atleast one file');
    } else if (this.l_name == '' || this.l_name == undefined) {
      this.tstr.warning('Please Enter Lesson Name');
    } else if ((this.l_name || '').trim().length === 0) {
      this.tstr.warning('Please Enter Lesson Name');
      // event.target.value || '').trim().length === 0
    } else {

      var data = this.uploadingResponse;
      this.createVideoLesson(data)


      // upload video backup

      // this.isBtnSave = true;
      // this.spinner.show();
      // var formdata = new FormData();
      // var inp_file = this.myFiles[0];
      // var f_name = inp_file['name'].split(' ').join('');
      // formdata.append('file', inp_file, f_name); 
      // this.tutorservice.postUploadVideo(formdata).subscribe((data: any) => {
      //   this.createVideoLesson(data)
      // }), (error) => {
      //   this.tstr.error('error in video uploading...');
      // };

      // end upload video backup

    }
  }

  createVideoLesson(fileData) {
    this.spinner.show();
    var trim_lesson_name = this.l_name.trim();
    var s_data = { "name": trim_lesson_name, "fileUrl": (fileData.fileUrl || ''), "fileName": (fileData.fileName || '') }
    if (!this.lid) {
      this.hmservice.addVideoBySID(this.sid, s_data).subscribe((response) => {
        if (response) {
          if (response['status'] == 201) {
            this.spinner.hide()
            this.tstr.success(response['message']);
            this.router.navigateByUrl('/coursemaker');
            this.getSectiondata()
          }
        }
      }, (error) => {
        this.spinner.hide()
        this.getSectiondata();
        if (error.status === 500) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 400) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 401) {
          this.tstr.warning("Please Access with valid Token", '', { timeOut: 1000 });
          this.Authservice.invalidtokenAccress();
        } else if (error.status == 404) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 409) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 406) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 204) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } 
        
      });
    } else {
      this.hmservice.updateLessionBySectionIdAndLessionId(this.sid, this.lid, s_data).subscribe((response) => {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        if (response) {
          if (response['status'] == 200 || response['status'] == 201) {
            // this.tstr.success('lesson updated');              
            // this.getSectiondata();    

            var course_lesson_data = response['data'];
            var lesson_length = course_lesson_data['lessonLength']
            var course_lesson_list = course_lesson_data['updateLesson'];
            setTimeout(() => { this.spinner.hide(); }, 1000);
            // this.showtext = true;
            // course_lesson_list.forEach(element => {
            //   if (element['id'] == this.lid) {
            //     this.isValid = false;
            //     element['fileUrl'] = this.removeOacademyUrl(element['fileUrl']);
            //     this.lesson_data = [element]
            //   }
            // });  


            // var x = [];
            // for (var i = 0; i <= this.lesson_data.length - 1; i++) {
            //   x.push(this.lesson_data[i].name)
            // }
            // this.l_name = x[0];

            this.tstr.success(response['message']);
            this.router.navigateByUrl('/coursemaker');
          }
        }
      }, (error) => {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        this.getSectiondata();
        if (error.status === 500) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 400) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 401) {
          this.tstr.warning("Please Access with valid Token", '', { timeOut: 1000 });
          this.Authservice.invalidtokenAccress();
        } else if (error.status == 404) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 409) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 406) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        } else if (error.status === 204) {
          this.tstr.error(error.error.message, '', { timeOut: 1000 });
        }
        });
    }

  }
  pricedata: any;
  changeLessonType(val) {
    $('#addSection').modal('show');
    this.pricedata = val;
  }





  getSectiondata() {
    this.spinner.show();
    this.hmservice.getLessondataBySID(this.sid).subscribe((response) => {
      if (response) {
        if (response['status'] == 200) {
          var course_lesson_data = response['data'];
          var lesson_length = course_lesson_data['lessonLength']
          var course_lesson_list = course_lesson_data['lessonList'];
          setTimeout(() => { this.spinner.hide(); }, 1000);
          // this.showtext = true;
          course_lesson_list.forEach(element => {
            if (element['id'] == this.lid) {
              this.isValid = false;
              this.hideSelectFileHere = false;
              element['fileUrl'] = this.removeOacademyUrl(element['fileUrl']);
              this.lesson_data = [element]
            }


          });


          var x = [];
          for (var i = 0; i <= this.lesson_data.length - 1; i++) {
            x.push(this.lesson_data[i].name)
          }
          this.l_name = x[0];
        }
      }



    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
    });
  }

  // deletevideolesson(event ,secId ,lessonid){
  //   event.stopPropagation();
  //   this.spinner.show()
  //   this.hmservice.deleteLessonBySIDLID(secId, lessonid).subscribe((response) => {
  //     if(response){
  //       if(response['status'] == 200){
  //         this.spinner.hide();
  //         this.tstr.success(response['message'], '', { timeOut: 1000 });
  //         this.router.navigateByUrl('coursemaker/video');
  //         // window.location.reload();
  //         this.getSectiondata();
  //         this.lesson_data = [];
  //         this.isValid = true;

  //       }
  //     }
  //     // this.toastr.success('Succesfully deleted');
  //   }, (error) => {
  //     this.spinner.hide();    
  //     this.getSectiondata();
  //     if (error.status === 500) {
  //       this.tstr.error(error.error.message,'', {timeOut: 1000});
  //     }  else if (error.status === 400) {
  //      this.tstr.error(error.error.message,'', {timeOut: 1000});
  //   } else if(error.status == 404){
  //      this.tstr.error(error.error.message,'', {timeOut: 1000});
  //   }else if (error.status === 409) {
  //      this.tstr.error(error.error.message,'', {timeOut: 1000});
  //   }else if (error.status === 406) {
  //     this.tstr.error(error.error.message,'', {timeOut: 1000});
  //   } else if(error.status ===  204 ){
  //     this.tstr.error(error.error.message,'', {timeOut: 1000});
  //   } else{
  //     this.tstr.error(error.error.message,'', {timeOut: 1000});
  // }
  //   });
  // }


  deletevideolesson(event, secId, lessonid) {
    event.stopPropagation();
    this.fileUploader.nativeElement.value = null;
    this.myFiles = [];
    this.isValid = true;
    this.hideSelectFileHere = true;
    this.isBtnSave = false;
    this.lesson_data = [];
    // window.location.reload();
    this.router.navigateByUrl('/coursemaker/video');

  }




  removeOacademyUrl(url) {
    if (url) {
      url = url.split('oacademy/').join('')
    }
    return url
  }

  checkVideoID: any;

  checkVideoPlayer(dat, i) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    $('#myModal' + i).modal('show');
    this.checkVideoID = document.getElementById("vplayer_" + i);
  }

  stopVideo() {
    this.checkVideoID.pause();
    this.checkVideoID.currentTime = 0;
  }


  closeModal(i) {
    $('#myModal' + i).modal('hide');
    this.stopVideo();
  }


  checkSpaces(event) {

    // const isWhitespace = (event.target.value || '').trim().length === 0;
    // const isValid = !isWhitespace;
    // return isValid ? null : { 'whitespace': true };


  }


  onClickInsideContainer() {

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
