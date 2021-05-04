import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-maker-home',
  templateUrl: './course-maker-home.component.html',
  styleUrls: ['./course-maker-home.component.css']
})
export class CourseMakerHomeComponent implements OnInit {
  showUser = true;
  showUserDiv = false;
  username : any;
  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

  gettoken = 'token';
  usermail;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.usermail=sessionStorage.getItem('eId')
  }

  nav_to_home() {
    this.router.navigate(['tutor']).then(() => {
      window.location.reload();
    });
  }

  gotoLogOut(){
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.gettoken);
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }  
  showUserDivMethod(){
    this.showUserDiv = !this.showUserDiv;
  }

}
