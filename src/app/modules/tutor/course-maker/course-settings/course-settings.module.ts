import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseSettingsRoutingModule } from './course-settings-routing.module';
import { CourseSettingsBrandingComponent } from '../../../../components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-branding/course-settings-branding.component';
import { CourseSettingsPexpiryComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-pexpiry/course-settings-pexpiry.component';
import { CourseSettingsDestroyComponent } from 'src/app/components/tutor/course-maker/course-maker-home/course-maker-settings/course-settings-destroy/course-settings-destroy.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EditorModule} from 'primeng/editor';


@NgModule({
  declarations: [
    CourseSettingsBrandingComponent,
    CourseSettingsPexpiryComponent,
    CourseSettingsDestroyComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    AngularEditorModule, 
    ReactiveFormsModule,
    CourseSettingsRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    EditorModule
  ]
})
export class CourseSettingsModule { }
