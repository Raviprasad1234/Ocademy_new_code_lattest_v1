import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-maker-certification',
  templateUrl: './course-maker-certification.component.html',
  styleUrls: ['./course-maker-certification.component.css']
})

export class CourseMakerCertificationComponent implements OnInit, OnDestroy {

  sub:Subscription

  constructor(private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.sub = this.activatedRoute
      .data
      .subscribe(v => {
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goback(){
    // this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    this.router.navigateByUrl('coursemaker');
  }

}
