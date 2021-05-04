import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentcoursesComponent } from '../../components/mainHome/studentcourses/studentcourses.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MylearningComponent } from '../../components/student/mylearning/mylearning.component';
import { MyonlineClassesComponent } from '../../components/student/myonline-classes/myonline-classes.component';
import { MyCartComponent } from '../../components/student/my-cart/my-cart.component';
import { PurchasehistoryComponent } from '../../components/student/purchasehistory/purchasehistory.component';
import { NotificationsComponent } from '../../components/student/notifications/notifications.component';
import { EditProfileComponent } from '../../components/student/edit-profile/edit-profile.component';
import { PaymentMethodsComponent } from '../../components/student/payment-methods/payment-methods.component';
import { StudentAccountSettingsComponent } from '../../components/student/student-account-settings/student-account-settings.component';
import { StudentDashboardComponent } from '../../components/student/student-dashboard/student-dashboard.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { StudentHeaderComponent } from '../../components/student/student-header/student-header.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { StudentFooterComponent } from '../../components/student/student-footer/student-footer.component';
import { NotesComponent } from 'src/app/components/mainHome/notes/notes.component';
import { AnnouncementsComponent } from 'src/app/components/mainHome/announcements/announcements.component';
import { SearchhComponent } from 'src/app/components/mainHome/searchh/searchh.component';
import { OverviewComponent } from 'src/app/components/mainHome/overview/overview.component';
import { QandaComponent } from 'src/app/components/mainHome/qanda/qanda.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalPipePipe } from 'src/app/services/common/globalsearch.pipe';

import { RatingModule } from 'ng-starrating';
import { GlobalModule } from '../global/global.module';

import { PdfViewerModule  , PdfViewerComponent  } from 'ng2-pdf-viewer';
import { StudentWishlistComponent } from 'src/app/components/student/student-wishlist/student-wishlist.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { WishlistSearchPipe } from 'src/app/services/common/wish-list-filter.pipe';
import { AvoidSpacesDirective } from 'src/app/services/common/avoid.space.service';


import {SkeletonModule} from 'primeng/skeleton';
import { AvoidSpacesRatingDirective } from 'src/app/services/common/aviod-space-rating';







@NgModule({
  declarations: [
    StudentcoursesComponent,
    MylearningComponent,
    MyonlineClassesComponent,
    MyCartComponent,
    PurchasehistoryComponent,
    NotificationsComponent,
    EditProfileComponent,
    PaymentMethodsComponent,
    StudentAccountSettingsComponent,
    StudentDashboardComponent,
    StudentHeaderComponent,
    StudentFooterComponent,
    NotesComponent,
    AnnouncementsComponent,
    SearchhComponent,
    OverviewComponent,
    QandaComponent,
    GlobalPipePipe,    
    StudentWishlistComponent,
    WishlistSearchPipe,
    AvoidSpacesDirective,
    AvoidSpacesRatingDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule, VgOverlayPlayModule, VgBufferingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    NgxUsefulSwiperModule,
    MatTabsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RatingModule,
    GlobalModule,
    PdfViewerModule,
    SkeletonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],providers :[ PdfViewerComponent]
})
export class StudentModule { }
