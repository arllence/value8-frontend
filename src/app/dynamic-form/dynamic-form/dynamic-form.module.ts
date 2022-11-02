import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from '../dynamic-field.directive';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DynamicSelectComponent } from '../dynamic-select/dynamic-select.component';
import { DynamicRadioComponent } from '../dynamic-radio/dynamic-radio.component';
import { DynamicCheckboxComponent } from '../dynamic-checkbox/dynamic-checkbox.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { DynamicDatepickerComponent } from '../dynamic-datepicker/dynamic-datepicker.component';


@NgModule({
  declarations: [DynamicFieldDirective,DynamicInputComponent, DynamicFormComponent,
    DynamicSelectComponent,DynamicRadioComponent,DynamicCheckboxComponent,
    DynamicButtonComponent,DynamicDatepickerComponent,
  ],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  entryComponents: [
    DynamicInputComponent,
    DynamicSelectComponent,DynamicRadioComponent,DynamicCheckboxComponent,
    DynamicButtonComponent,DynamicDatepickerComponent
  ]
})
export class DynamicFormModule { }
