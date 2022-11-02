import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GeneralReportsComponent } from '../general/container/general/general-report.component';
// import { GeneralSubmissionComponent } from '../general/container/reports/submission-report.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';

import { GeneralRoutingModule } from './general-routing.module';

// import { TagInputModule } from 'ngx-chips';
// import { QuillModule } from 'ngx-quill'
// import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { ReviewersReportsComponent } from '../general/container/reviewers/reviewers-report.component';
import { EvaluationReportsComponent } from '../general/container/evaluation/evaluation-report.component';
// import { AccordionModule } from 'ngx-bootstrap/accordion'


@NgModule({
  declarations: [
    GeneralReportsComponent,
    ReviewersReportsComponent,
    EvaluationReportsComponent
  ],

  imports: [

    GeneralRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,

    // TagInputModule,
    // QuillModule,
    // ChartsModule,
    NgxPrintModule,
    // AccordionModule
  ]
})
export class GeneralModule { }

