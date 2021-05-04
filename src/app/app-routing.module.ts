import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { MainHomeComponentComponent } from './components/main-home-component/main-home-component.component';
import { GlobalsearchComponent } from './components/mainHome/globalsearch/globalsearch.component';
import { SearchComponent } from './components/mainHome/search/search.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainHomeComponentComponent  },
  { path: 'gotocart', component: AddToCartComponent , canActivate: [AuthGuardService]  },
  { path: 'search', component: SearchComponent , canActivate: [AuthGuardService] },
  { path: 'globalsearch', component: GlobalsearchComponent  , canActivate: [AuthGuardService] },
  // { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'tutor', loadChildren: () => import('./modules/tutor/tutor.module').then(m => m.TutorModule) },
  { path: 'coursemaker', loadChildren: () => import('./modules/tutor/course-maker/course-maker.module').then(m => m.CourseMakerModule) },
  { path: 'student', loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule) },
  { path: 'ressetpassword', component: ResetpasswordComponent  },
  { path: 'verifyemail', component: VerifyEmailComponent  },
  {path:'**', redirectTo:'home'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
