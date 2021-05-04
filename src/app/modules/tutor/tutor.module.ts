import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorHomeComponent } from 'src/app/components/tutor/tutor-home/tutor-home.component';
import { TutorDashboardComponent } from 'src/app/components/tutor/tutor-dashboard/tutor-dashboard.component';
import { TutorCoursesComponent } from '../../components/tutor/tutor-courses/tutor-courses.component';

import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TwoDigitDecimaNumberDirective } from 'src/app/services/common/only.number-decimal.service';
import { OnlyCharactersDirective } from 'src/app/services/common/only.strings.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { OnlySectionsCharactersDirective } from 'src/app/services/common/avoid.special-character';



@NgModule({
  declarations: [
    TutorHomeComponent,
    TutorDashboardComponent,
    TutorCoursesComponent,
    TwoDigitDecimaNumberDirective,
    OnlyCharactersDirective
    // OnlySectionsCharactersDirective
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class TutorModule { }
