import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorCommunicationComponent } from 'src/app/components/tutor/tutor-communication/tutor-communication.component';
import { TutorCoursesComponent } from 'src/app/components/tutor/tutor-courses/tutor-courses.component';
import { TutorDashboardComponent } from 'src/app/components/tutor/tutor-dashboard/tutor-dashboard.component';
import { TutorHomeComponent } from 'src/app/components/tutor/tutor-home/tutor-home.component';
import { TutorReportsComponent } from 'src/app/components/tutor/tutor-reports/tutor-reports.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: TutorHomeComponent, canActivate: [AuthGuardService], children: [
      { path: 'dashboard', component: TutorDashboardComponent },
      { path: 'courses', component: TutorCoursesComponent },
      { path: 'communication', component: TutorCommunicationComponent },
      { path: 'reports', component: TutorReportsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
