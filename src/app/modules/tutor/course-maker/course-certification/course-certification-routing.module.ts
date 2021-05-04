import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseMakerCertificationDesgnComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification-desgn/course-maker-certification-desgn.component';
import { CourseMakerCertificationTemp1Component } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification-temp1/course-maker-certification-temp1.component';
import { CourseMakerCertificationComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  {path:'',component: CourseMakerCertificationComponent, canActivate: [AuthGuardService], data : {c_id : '9999'}, children:[
    {path:'', component:CourseMakerCertificationDesgnComponent},
    {path:'cert-temp1.do', component:CourseMakerCertificationTemp1Component}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCertificationRoutingModule { }
