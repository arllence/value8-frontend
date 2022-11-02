import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';

import { AnalyticsRoutingModule } from './analytics-routing.module';

import { NgxPrintModule } from 'ngx-print';
import { AnalyticsComponent } from '../container/analytics.component';
import { DroppedAnalyticsComponent } from '../container/dropped/dropped.component';
import { EvaluatedAnalyticsComponent } from '../container/evaluated/evaluated.component';


@NgModule({
  declarations: [
    AnalyticsComponent,
    DroppedAnalyticsComponent,
    EvaluatedAnalyticsComponent
  ],

  imports: [

    AnalyticsRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,

    NgxPrintModule,
  ]
})
export class AnalyticsModule { }

