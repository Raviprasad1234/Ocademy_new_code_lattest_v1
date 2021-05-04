import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderComponent } from 'src/app/components/global-header/global-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchPipePipe } from 'src/app/components/search-pipe.pipe';



import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatToolbarModule} from '@angular/material/toolbar';


import {MatInputModule} from '@angular/material/input';
import { AvoidwhitespacesDirective } from 'src/app/services/avoidwhitespaces.directive';
import { LanguageTranslatorComponent } from 'src/app/components/language-translator/language-translator/language-translator.component';

import {AccordionModule} from 'primeng/accordion'
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    GlobalHeaderComponent,
    SearchPipePipe,
    AvoidwhitespacesDirective,
    LanguageTranslatorComponent
  ],
  exports: [
    GlobalHeaderComponent,
    SearchPipePipe,
    AvoidwhitespacesDirective,
    LanguageTranslatorComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AccordionModule,
    ButtonModule
    ],
})
export class GlobalModule { }
