import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApplicationDetailsComponent } from '../container/application-details/application-details.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { GownsOfficerRoutingModule } from './application-routing.module';

// import { TagInputModule } from 'ngx-chips';
// import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { EligibilityComponent } from '../container/eligibility/eligibility.component';
import { ProposalComponent } from '../container/proposal/proposal.component';
import { AdditionalInformationComponent } from '../container/additional-information/additional-information.component';
import { DeclarationComponent } from '../container/declaration/declaration.component';
import { ApplicationReviewComponent } from '../container/review/review.component';
import { AttachmentsComponent } from '../container/attachments/attachments.component';

@NgModule({
  declarations: [
    EligibilityComponent, 
    ProposalComponent,
    ApplicationDetailsComponent,
    AdditionalInformationComponent,
    DeclarationComponent,
    ApplicationReviewComponent,
    AttachmentsComponent
  ],

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,
    GownsOfficerRoutingModule,

    ChartsModule,
    NgxPrintModule,
    AccordionModule
  ]
})
export class ApplicationModule { }

