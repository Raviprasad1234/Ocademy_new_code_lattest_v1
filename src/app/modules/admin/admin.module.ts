import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from '../../components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard/admin-dashboard.component';
import { AdminUserStatusComponent } from '../../components/admin/admin-user-status/admin-user-status.component';
import { AdminReportsComponent } from '../../components/admin/admin-reports/admin-reports.component';
import { AdminSettingsComponent } from '../../components/admin/admin-settings/admin-settings.component';
import { AdminCouponsComponent } from '../../components/admin/admin-coupons/admin-coupons.component';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCreateCouponsComponent } from '../../components/admin/admin-create-coupons/admin-create-coupons.component';
import { AdminAllCouponsComponent } from '../../components/admin/admin-all-coupons/admin-all-coupons.component';
import { AdminEditProfileComponent } from '../../components/admin/admin-edit-profile/admin-edit-profile.component';
import { AdminProjectApprovalsComponent } from '../../components/admin/admin-project-approvals/admin-project-approvals.component';
import { TwoDigitDecimaNumberAminDirective } from 'src/app/services/common/only.number-decimal-admin.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { StudentStatusComponent } from '../../components/admin/student-status/student-status.component';
import { TutorStatusComponent } from '../../components/admin/tutor-status/tutor-status.component';
import { CourseInterfaceComponent } from '../../components/admin/course-interface/course-interface.component';

@NgModule({
  declarations: [AdminHomeComponent,
    AdminDashboardComponent,
    AdminUserStatusComponent,
    AdminReportsComponent,
    AdminSettingsComponent,
    AdminCouponsComponent,
    AdminCreateCouponsComponent,
    AdminAllCouponsComponent,
    AdminEditProfileComponent,
    AdminProjectApprovalsComponent,
    TwoDigitDecimaNumberAminDirective,
    StudentStatusComponent,
    TutorStatusComponent,
    CourseInterfaceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class AdminModule { }
