import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseMakerSettingsComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-maker-settings.component';
import { CourseSettingsBrandingComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-branding/course-settings-branding.component';
import { CourseSettingsDestroyComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-destroy/course-settings-destroy.component';
import { CourseSettingsPexpiryComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-pexpiry/course-settings-pexpiry.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  {path:'',component: CourseMakerSettingsComponent, canActivate: [AuthGuardService],data : {c_id : '9999'}, children:[
    {path:'branding',component:CourseSettingsBrandingComponent},
    {path:'pexpiry',component:CourseSettingsPexpiryComponent},
    {path:'destroy',component:CourseSettingsDestroyComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseSettingsRoutingModule { }
