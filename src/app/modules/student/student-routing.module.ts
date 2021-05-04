import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent } from 'src/app/components/mainHome/announcements/announcements.component';
import { NotesComponent } from 'src/app/components/mainHome/notes/notes.component';
import { OverviewComponent } from 'src/app/components/mainHome/overview/overview.component';
import { QandaComponent } from 'src/app/components/mainHome/qanda/qanda.component';
import { SearchComponent } from 'src/app/components/mainHome/search/search.component';
import { SearchhComponent } from 'src/app/components/mainHome/searchh/searchh.component';
import { StudentcoursesComponent } from 'src/app/components/mainHome/studentcourses/studentcourses.component';
import { EditProfileComponent } from 'src/app/components/student/edit-profile/edit-profile.component';
import { MyCartComponent } from 'src/app/components/student/my-cart/my-cart.component';
import { MylearningComponent } from 'src/app/components/student/mylearning/mylearning.component';
import { MyonlineClassesComponent } from 'src/app/components/student/myonline-classes/myonline-classes.component';
import { NotificationsComponent } from 'src/app/components/student/notifications/notifications.component';
import { PaymentMethodsComponent } from 'src/app/components/student/payment-methods/payment-methods.component';
import { PurchasehistoryComponent } from 'src/app/components/student/purchasehistory/purchasehistory.component';
import { StudentAccountSettingsComponent } from 'src/app/components/student/student-account-settings/student-account-settings.component';
import { StudentDashboardComponent } from 'src/app/components/student/student-dashboard/student-dashboard.component';
import { StudentWishlistComponent } from 'src/app/components/student/student-wishlist/student-wishlist.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';



const routes: Routes = [
  { path: '', component: MylearningComponent, canActivate: [AuthGuardService]},
  {  
    path: 'details', component: StudentcoursesComponent, canActivate: [AuthGuardService]
    , children: [
      { path: '', component: SearchhComponent },
      { path: 'search', component: SearchhComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'answer', component: QandaComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'annoucement', component: AnnouncementsComponent }
    ]
  },
  { path: 'studentlearning', component: StudentDashboardComponent , canActivate: [AuthGuardService] },
  { path: 'studentonlineclass', component: MyonlineClassesComponent, canActivate: [AuthGuardService]  },
  { path: 'studentNotification', component: NotificationsComponent, canActivate: [AuthGuardService]  },
  { path: 'paymentmethod', component: PaymentMethodsComponent, canActivate: [AuthGuardService]  },
  { path: 'purchasehistory', component: PurchasehistoryComponent, canActivate: [AuthGuardService]  },
  { path: 'studentWishlist', component: StudentWishlistComponent, canActivate: [AuthGuardService]  },
  { path: 'settings', component: StudentAccountSettingsComponent, canActivate: [AuthGuardService]  },
  { path: 'mycart', component: MyCartComponent  },
  {path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }