import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-maker-certification-temp1',
  templateUrl: './course-maker-certification-temp1.component.html',
  styleUrls: ['./course-maker-certification-temp1.component.css']
})
export class CourseMakerCertificationTemp1Component implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  cert_text = 'Certificate of completion'

  goback(){
    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    // this.router.navigateByUrl('coursemaker');
  }

}
