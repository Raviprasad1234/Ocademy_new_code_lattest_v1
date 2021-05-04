import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.css']
})
export class PurchasehistoryComponent implements OnInit {

  constructor( private  studentSer : StudentService , 
    private Authservice : AuthService,
    private  spinner : NgxSpinnerService,
    private toster :  ToastrService  ) { }

  ngOnInit(): void {
    this.getPurchasehistoryMethod();

  }

  shownohistoryDiv = false;

  GetallPurchaseHistoriesArr : any;


  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });

    return data
  }





  getPurchasehistoryMethod(){
    this.spinner.show();
    var uid = sessionStorage.getItem('uid');
    this.studentSer.getStudentPurchasedCourses(uid).subscribe((response)=>{
      if(response){
        setTimeout(() => {this.spinner.hide();}, 500);
        if(response['status']== 200){
          var course_list_data = response['data'];
          var course_list   =   course_list_data['courseList'];

          if(course_list.length == 0){
            this.shownohistoryDiv = true;
          }
          this.GetallPurchaseHistoriesArr = this.removeOacademyUrl(course_list);
        }
      }
    }, (error)=>{
      this.spinner.hide();
      if (error.status === 500) {
        this.toster.error(error.error.message,'', {timeOut: 1000});
      }  else if (error.status === 400) {
       this.toster.error(error.error.message,'', {timeOut: 1000});
    } else if (error.status === 401) {
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
  }


}
