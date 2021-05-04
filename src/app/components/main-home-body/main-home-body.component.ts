import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
declare var $: any;
@Component({
  selector: 'app-main-home-body',
  templateUrl: './main-home-body.component.html',
  styleUrls: ['./main-home-body.component.css']
})
export class MainHomeBodyComponent implements OnInit {
  responsiveOptions
  futuredate : any;
  constructor(private  router : Router  , private categoryserv : CategoriesService) {

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '992px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

   }
  ngOnInit(): void {
    this.getallCoursesonMainHomePageMethod();
    $('#myCarousel').carousel({
      interval: 3000,
      cycle: true
    }); 
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    var d = new Date();
    if(d.getDate() >= 25){
      this.futuredate = d.getDate() + 5 + '-' + monthNames[d.getMonth()+1] +'-'+ d.getFullYear()
    }else{
      this.futuredate = d.getDate() + 5 + '-' + monthNames[d.getMonth()] +'-'+ d.getFullYear()
    }
  }
  gotoCateg(val){
    this.router.navigate(['/globalsearch', { cateName: val }])
  }



  
gotocart(id, val) {
  this.router.navigate(['/gotocart', { cid: id, courseTitle: val }]);
};



  StartTechingTodayMethod(){

    var token = sessionStorage.getItem('token');

    if(token == null || token == undefined || token == ''){
      this.router.navigate(['/home']);
    } else{
      this.router.navigate(['/tutor/courses']);     
    }
  }


  removeOacademyUrl(data) {
    data.forEach(element => {
      if (element['fileUrl'])
        element['fileUrl'] = element['fileUrl'].split('oacademy/').join('')
    });
    return data
  }
  
  // gotocart(id, val) {
  //   this.route.navigate(['/gotocart', { cid: id, courseTitle: val }]);
  // };
  
  removeCoverImageOacademyUrl(data) {
    data.forEach(element => {
      if (element['coverImageUrl'])
        element['coverImageUrl'] = element['coverImageUrl'].split('oacademy/').join('')
    });
    return data
  }
  



  getallcourseList : any; 
  selectedLevel1Data : any;
  all_Data : any;
  firstCourse : any;

  noCoursesAvailable = false;

  getallCoursesonMainHomePageMethod(){
    this.getallcourseList  = []; 

    this.categoryserv.getAllCourses().subscribe((response)=>{
      console.log(response , "rresd get all courses");

      if(response){
        if(response['status'] == 200){
          var data = response['data'];
          var courseList = data['courseList'];

          if(courseList.length == 0  || courseList  == []){
              console.log('no courses');

            this.noCoursesAvailable = true;

          } else{

            this.noCoursesAvailable = false;
            this.getallcourseList = courseList;

            this.selectedLevel1Data = this.removeOacademyUrl(this.getallcourseList);
            this.all_Data = this.removeCoverImageOacademyUrl(this.selectedLevel1Data);
            this.firstCourse =this.all_Data.reverse()
         
          }
        }
      }

    }, (error)=>{
      console.log(error);
    })

  }


}
