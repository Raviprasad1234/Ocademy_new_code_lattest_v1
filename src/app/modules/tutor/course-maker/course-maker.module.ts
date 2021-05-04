import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseMakerRoutingModule } from './course-maker-routing.module';
import { MatButtonModule } from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { CourseMakerHomeComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-home.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseMakerAddSectionComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-add-section/course-maker-add-section.component';
import { CourseMakerSettingsComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-maker-settings.component';
import { CourseMakerVideoComponent } from '../../../components/tutor/course-maker/course-maker-home/course-maker-video/course-maker-video.component';
import { CourseMakerPublishstatusComponent } from '../../../components/tutor/course-maker/course-maker-home/course-maker-publishstatus/course-maker-publishstatus.component';
import { DndModule } from 'ngx-drag-drop';
import { CourseMakerPdfComponent } from '../../../components/tutor/course-maker/course-maker-home/course-maker-pdf/course-maker-pdf.component';

import { NgxFileDropModule } from 'ngx-file-drop';


import {MatExpansionModule} from '@angular/material/expansion';

import { RemoveSpacesDirective } from 'src/app/services/common/remove.space.service';
import { OnlySectionsCharactersDirective } from 'src/app/services/common/avoid.special-character';


import { PdfViewerModule   } from 'ng2-pdf-viewer';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    CourseMakerHomeComponent,
    CourseMakerAddSectionComponent,
    CourseMakerSettingsComponent,
    CourseMakerVideoComponent,
    CourseMakerPublishstatusComponent,
    CourseMakerPdfComponent,
    RemoveSpacesDirective,
    OnlySectionsCharactersDirective
  ],
  imports: [
    CommonModule,
    CourseMakerRoutingModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    NgxFileDropModule,
    PdfViewerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CourseMakerModule { }
