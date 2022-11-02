import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
// import { GownsOfficerRoutingModule } from './evaluation.module';

// import { TagInputModule } from 'ngx-chips';
// import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
// import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { EvaluationComponent } from '../container/evaluation/evaluation.component';
import { ApplicationReviewComponent } from '../container/review/review.component';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { JuryComponent } from '../container/jury/jury.component';

@NgModule({
  declarations: [
    EvaluationComponent,
    JuryComponent,
    ApplicationReviewComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,
    EvaluationRoutingModule,

    ChartsModule,
    // NgxPrintModule,
    AccordionModule
  ]
})
export class EvaluationModule { }

