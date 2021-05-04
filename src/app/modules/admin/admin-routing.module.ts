import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAllCouponsComponent } from 'src/app/components/admin/admin-all-coupons/admin-all-coupons.component';
import { AdminCouponsComponent } from 'src/app/components/admin/admin-coupons/admin-coupons.component';
import { AdminCreateCouponsComponent } from 'src/app/components/admin/admin-create-coupons/admin-create-coupons.component';
import { AdminDashboardComponent } from 'src/app/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from 'src/app/components/admin/admin-home/admin-home.component';
import { AdminProjectApprovalsComponent } from 'src/app/components/admin/admin-project-approvals/admin-project-approvals.component';
import { AdminReportsComponent } from 'src/app/components/admin/admin-reports/admin-reports.component';
import { AdminSettingsComponent } from 'src/app/components/admin/admin-settings/admin-settings.component';
import { AdminUserStatusComponent } from 'src/app/components/admin/admin-user-status/admin-user-status.component';
import { CourseInterfaceComponent } from 'src/app/components/admin/course-interface/course-interface.component';
import { StudentStatusComponent } from 'src/app/components/admin/student-status/student-status.component';
import { TutorStatusComponent } from 'src/app/components/admin/tutor-status/tutor-status.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';


const routes: Routes = [
  // { path: '', component: AdminHomeComponent, canActivate: [AuthGuardService] , children:[
  //   {path:'dashboard',component:AdminDashboardComponent},
  //   {path:'ustatus',component:AdminUserStatusComponent},
  //   { path:'ustatus/studentsData',component:StudentStatusComponent},
  //   { path:'ustatus/tutorsData',component:TutorStatusComponent},
  //   {path:'projectapprovals',component:AdminProjectApprovalsComponent},
  //   {path:'coupons',component:AdminCouponsComponent},
  //   {path : 'createcoupons' , component:AdminCreateCouponsComponent},
  //   {path : 'allcoupons' , component:AdminAllCouponsComponent},
  //   {path:'reports',component:AdminReportsComponent},
  //   {path:'settings',component:AdminSettingsComponent},
  //   {path:'interface',component:CourseInterfaceComponent}
  // ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
