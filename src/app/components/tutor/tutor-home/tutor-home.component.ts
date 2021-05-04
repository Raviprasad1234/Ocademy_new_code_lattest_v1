import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.css']
})
export class TutorHomeComponent implements OnInit {
  showUserDiv = false;
  thome_left = false;
  thome_right = false;
  tabs = [
    {
      id: 0,
      class: "fa fa-dashboard",
      name: "Dashboard",
      path: '/tutor/dashboard',
      active: true
    },
    {
      id: 1,
      class: "fa fa-leanpub",
      name: "Courses Creation",
      path: '/tutor/courses',
      active: false
    },
    // ,{
    //   id: 2,
    //   class: "fa fa-film",
    //   name: "Communication",
    //   path:'/tutor/communication',
    //   active: false
    // },
    // {
    //   id: 3,
    //   class: "fa fa-comments",
    //   name: "Reports",
    //   path: '/tutor/reports',
    //   active: false
    // }
  ]
  stab = this.tabs[0]
  userEmailID : any;
  constructor(private router: Router) {

  }
  img1 = true;
  img2 = false;
  username: any;
  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
  ngOnInit(): void {

    this.userEmailID = sessionStorage.getItem('eId');

    if (sessionStorage.getItem('sel_tut_tab')) {
      var sel_tut_tab = parseInt(sessionStorage.getItem('sel_tut_tab')) || 0;
      var sel_data = this.tabs.find(x => x.id === sel_tut_tab)
      if (sel_data) {
        this.snav_tabs_click(sel_data);
      }else{
        this.snav_tabs_click(this.stab);
      }
    }else{
      this.snav_tabs_click(this.stab);
    }
    this.username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  nav_to_home() {
    this.router.navigate(['tutor']).then(() => {
      window.location.reload();
    });
  }

  nav_over() {
    this.thome_left = true;
    this.thome_right = true;
    this.img1 = false;
    this.img2 = true;
  }
  nav_out() {
    this.thome_left = false
    this.thome_right = false
    this.img1 = true;
    this.img2 = false;
  }
  actinactAllTabs(inp) {
    this.tabs.forEach(element => {
      element['active'] = inp
    });
  }
  snav_tabs_click(tb) {
    sessionStorage.setItem('sel_tut_tab', tb['id'])
    this.showUserDiv = false;
    this.stab = tb;
    this.actinactAllTabs(false)
    tb['active'] = 'true';
    this.router.navigate([tb['path']])
  }


  gotoLogOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // this.router.navigate(['/home']);
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    sessionStorage.clear();
  }

  showUserDivMethod() {
    this.showUserDiv = !this.showUserDiv;
  }


  gotoStudentDashboard(){
    this.router.navigateByUrl('/student');
  }


  gotoStudent() {
    this.router.navigate(['/search'])
    // this.router.navigate(['/search']).then(() => {
    //   window.location.reload();
    // });
  }


}
