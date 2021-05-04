import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseMakerAddSectionComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-add-section/course-maker-add-section.component';
import { CourseMakerCertificationComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-certification/course-maker-certification.component';
import { CourseMakerHomeComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-home.component';
import { CourseMakerPdfComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-pdf/course-maker-pdf.component';
import { CourseMakerPublishstatusComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-publishstatus/course-maker-publishstatus.component';
import { CourseMakerSettingsComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-maker-settings.component';
import { CourseMakerVideoComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-video/course-maker-video.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';





const routes: Routes = [
  // { path: '', component: CourseMakerHomeComponent, canActivate: [AuthGuardService] , children:[
  {
    path: '', component: CourseMakerHomeComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: CourseMakerAddSectionComponent },
      { path: 'video', component: CourseMakerVideoComponent },
      {path: 'pdf' , component:CourseMakerPdfComponent},
      { path: 'pstatus', component: CourseMakerPublishstatusComponent },
      { path: 'certification', loadChildren: () => import('./course-certification/course-certification.module').then(m => m.CourseCertificationModule) },
      { path: 'settings', loadChildren: () => import('./course-settings/course-settings.module').then(m => m.CourseSettingsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseMakerRoutingModule { }
