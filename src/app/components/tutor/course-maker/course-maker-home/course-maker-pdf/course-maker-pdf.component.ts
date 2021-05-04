import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseMakerHomeService } from 'src/app/services/tutor/course-maker/course-maker-home.service';
import { TutorServiceService } from 'src/app/services/tutor/tutor-service.service';
declare var $: any;

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ObservableService } from 'src/app/services/common/Observable-service';
import { Subscription } from 'rxjs';


import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-course-maker-pdf',
  templateUrl: './course-maker-pdf.component.html',
  styleUrls: ['./course-maker-pdf.component.css']
})
export class CourseMakerPdfComponent implements OnInit {



  CourseTitle: any;

  isBtnSave = false;

  ngOnInit() {
    // this.subscription =  this.messageService.getMessage().subscribe(SectionNameData => {
    // });
    this.CourseTitle = sessionStorage.getItem('title');
    this.getSectiondata();
    //this.restrictInspect();
  }


  l_name = ''
  cid = 0
  sid = 0
  lid = 0
  lesson_data = []

  open_url = ''
  sectiontitle: any;

  PdfSectionName: any;

  subscription: Subscription;


  public files: NgxFileDropEntry[] = [];

  SelectedsectionName: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private ObservableSer: ObservableService,
    private Authservice: AuthService,
    private hmservice: CourseMakerHomeService, private tstr: ToastrService,
    private tutorservice: TutorServiceService, private spinner: NgxSpinnerService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.cid = this.router.getCurrentNavigation().extras.state['course_id'];
      this.sid = this.router.getCurrentNavigation().extras.state['section_id'];
      this.gethesectionameServiceMethod();
      if (this.router.getCurrentNavigation().extras.state['lesson_id']) {
        this.lid = this.router.getCurrentNavigation().extras.state['lesson_id']
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



  isValid = true;
  hideSelectFileHere = true;
  goback() {

    if (this.isapiloading == true) {
      return;
    } else {
      this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    }
    // this.router.navigateByUrl('coursemaker');
  }


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




  // video drag and drop event 


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type == "video/mp4" || file.type == "video/ogg") {
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


  public fileOver(event) {
  }

  public fileLeave(event) {
  }

  // end video drag and drop 

  myFiles: any[] = [];
  sMsg: string = '';
  uploadingResponse: any;

  isapiloading = false;
  showUploadSpinner = false;

  getFileDetails(e) {

    console.log(e, "upload file here ...!");





    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].type == 'application/pdf') {
        //   this.myFiles.push(e.target.files[i]);
        //  this.myFiles.push(e.target.files[i]);

        this.isapiloading = true;
        this.showUploadSpinner = true;
        this.showvideodiv = true;
        this.isValid = false;
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
          this.tstr.error('error in PDF uploading...');
        };
      } else {

        this.isapiloading = false;
        this.showUploadSpinner = false;
        this.hideSelectFileHere = true;
        this.isValid = true;
        e.target.value = ""
        this.tstr.warning('Unsupported Format Uploaded..');
        return;
      }




      // if(e.target.files[i].type ==  "video/mp4"  || e.target.files[i].type ==  "video/ogg"){
      //   this.myFiles.push(e.target.files[i]);
      // }else{
      //   this.tstr.warning('Unsupported Format..');
      //   return;
      // }

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
    // this.isValid = true;
    // this.hideSelectFileHere = true;
    // e.target.value = ""

    // console.log(e , " end upload file here ...!")

    e.target.value = ""

  }

  uploadFiles() {
    const frmData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }
  }

  uploadimage() {
    console.log("upload pdf");
    document.getElementById('file-chooser').click();
  }

  seconduploadfun() {
    document.getElementById('secondupload').click();
  }

  @ViewChild('fileUploader') fileUploader: ElementRef;

  showvideodiv = false;
  deletevideo() {

    console.log("upload video 1212");

    this.fileUploader.nativeElement.value = null;
    this.myFiles = [];
    this.isValid = true;
    this.hideSelectFileHere = true;
    this.isBtnSave = false;
    //  this.showvideodiv = true;

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

      // this.spinner.show();
      // var formdata = new FormData();
      // var inp_file = this.myFiles[0];
      // // alert('This file size is: ' + inp_file['size']/1024/1024 + "MB");
      // var f_name = inp_file['name'].split(' ').join('');
      // formdata.append('file', inp_file, f_name)  
      // this.tutorservice.postUploadVideo(formdata).subscribe((data: any) => {
      //   this.createVideoLesson(data);
      //   this.isBtnSave = true;
      //   // this.isapiloading = false;


      // }), (error) => {
      //   this.tstr.error('error in video uploading...');
      // };
    }
  }

  createVideoLesson(fileData) {

    var trim_lesson_name = this.l_name.trim();
    var s_data = { "name": trim_lesson_name, "fileUrl": (fileData.fileUrl || ''), "fileName": (fileData.fileName || '') }
    if (!this.lid) {
      this.hmservice.addVideoBySID(this.sid, s_data).subscribe((res) => {
        this.spinner.hide()
        this.tstr.success('lesson created ');
        this.router.navigateByUrl('/coursemaker');
        this.getSectiondata();

      }, (error) => {
        this.spinner.hide()
        this.tstr.error('error in lesson creation')
        this.getSectiondata()
      });
    } else {
      this.hmservice.updateLessionBySectionIdAndLessionId(this.sid, this.lid, s_data).subscribe((response) => {

        if (response) {
          if (response['status'] == 200 || response['status'] == 201) {
            this.spinner.hide();
            this.tstr.success('lesson updated')
            this.getSectiondata();

            this.router.navigateByUrl('/coursemaker');

          }
        }
      }, (error) => {
        this.spinner.hide()
        this.tstr.error('error in lesson creation')
        this.getSectiondata()
      });
    }

  }
  pricedata: any;
  changeLessonType(val) {
    $('#addSection').modal('show');
    this.pricedata = val;
  }

  getSectiondata() {
    this.spinner.show()
    this.hmservice.getLessondataBySID(this.sid).subscribe((response) => {
      if (response) {
        if (response['status'] == 200) {
          setTimeout(() => { this.spinner.hide(); }, 1000);
          var course_lesson_data = response['data'];
          var course_lesson_list = course_lesson_data['lessonList'];
          course_lesson_list.forEach(element => {
            if (element['id'] == this.lid) {
              this.isValid = false;
              this.hideSelectFileHere = false;
              element['fileUrl'] = this.removeOacademyUrl(element['fileUrl'])
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


  deletevideolesson(event, secId, lessonid) {
    event.stopPropagation();

    console.log(this.fileUploader.nativeElement.value, "this.fileUploader.nativeElement.value");

    this.fileUploader.nativeElement.value = null;

    this.myFiles = [];
    this.isValid = true;
    this.hideSelectFileHere = true;
    this.isBtnSave = false;
    this.lesson_data = [];
    // window.location.reload();
    this.router.navigateByUrl('/coursemaker/pdf');

  }






  removeOacademyUrl(url) {
    if (url) {
      url = url.split('oacademy/').join('')
    }
    return url
  }

  checkVideoID: any;

  checkVideoPlayer(dat, i) {
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


  totalPages: number;
  page: number = 1;
  isLoaded: boolean = false;


  showpdfnextbtnmethod() {
    if (this.totalPages <= this.page) {
      return;
    } else {
      this.page += 1;
    }
  }
  showpdfpreviousbtnmethod() {
    if (this.page == 1) {
      return;
    }
    this.page -= 1;
  }


  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
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



