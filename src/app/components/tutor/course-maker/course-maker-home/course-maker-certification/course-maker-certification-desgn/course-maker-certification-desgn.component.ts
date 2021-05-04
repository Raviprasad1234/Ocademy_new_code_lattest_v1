import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-course-maker-certification-desgn',
  templateUrl: './course-maker-certification-desgn.component.html',
  styleUrls: ['./course-maker-certification-desgn.component.css']
})
export class CourseMakerCertificationDesgnComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    
  }

  goback(){
    // this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
    this.router.navigateByUrl('coursemaker');
  }

  go_to_cert_template(){
    this.router.navigate(['cert-temp1.do'], { relativeTo: this.activatedRoute });
  }

}
