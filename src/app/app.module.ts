import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonHeaderComponent } from './components/headers/common-header/common-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular-material

import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { HomeComponent } from './components/home/home.component';
import { MainHomeComponentComponent } from './components/main-home-component/main-home-component.component';
import { MainHomeHeaderComponent } from './components/main-home-header/main-home-header.component';
// import { TutorHomeComponent } from './components/tutor/tutor-home/tutor-home.component';
// import { TutorDashboardComponent } from './components/tutor/tutor-dashboard/tutor-dashboard.component';
// import { MatCardModule } from '@angular/material/card';
// import {MatBadgeModule} from '@angular/material/badge';
// import {MatButtonModule} from '@angular/material/button';
// import {MatIconModule} from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainHomeBodyComponent } from './components/main-home-body/main-home-body.component';
import { SearchComponent } from './components/mainHome/search/search.component';
import { OnlynumberDirective } from './services/common/only.number.servie';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BodyPartComponent } from './components/home/body-part/body-part.component';


import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalsearchComponent } from './components/mainHome/globalsearch/globalsearch.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { GlobalModule } from './modules/global/global.module';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';


import { PdfViewerModule    } from 'ng2-pdf-viewer';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { LanguageTranslatorComponent } from 'src/app/components/language-translator/language-translator/language-translator.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


import {CarouselModule} from 'primeng/carousel';

import {ButtonModule} from 'primeng/button';

import { PlyrModule } from 'ngx-plyr';


import { RatingModule } from 'ng-starrating';



@NgModule({
  declarations: [
    AppComponent,
    CommonHeaderComponent,
    HomeComponent,
    MainHomeComponentComponent,
    MainFooterComponent,
    MainHomeHeaderComponent,
    // TutorHomeComponent,
    // TutorDashboardComponent,
    MainHomeBodyComponent,
    SearchComponent,
    OnlynumberDirective,
    BodyPartComponent,
    GlobalsearchComponent,
    AddToCartComponent,
    ResetpasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxPaginationModule,
    MatTabsModule,
    GlobalModule,
    PdfViewerModule,
    CarouselModule,
    ButtonModule,
    PlyrModule,
    RatingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
