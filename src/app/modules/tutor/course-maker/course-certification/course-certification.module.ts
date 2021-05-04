import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCertificationRoutingModule } from './course-certification-routing.module';
import { CourseMakerCertificationComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CourseMakerCertificationTemp1Component } from '../../../../components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification-temp1/course-maker-certification-temp1.component';
import { CourseMakerCertificationDesgnComponent } from '../../../../components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification-desgn/course-maker-certification-desgn.component';


@NgModule({
  declarations: [
    CourseMakerCertificationComponent,
    CourseMakerCertificationDesgnComponent,
    CourseMakerCertificationTemp1Component,
    CourseMakerCertificationDesgnComponent
  ],
  imports: [
    CommonModule,
    CourseCertificationRoutingModule,
    MatButtonModule,
    FormsModule
  ]
})
export class CourseCertificationModule { }
