import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from 'ng-pick-datetime';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { NgxPermissionsModule } from 'ngx-permissions';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { CommonErrorComponent } from '../../containers/common-error/common-error.component';
import { CommonHeaderComponent } from '../../containers/common-header/common-header.component';
import { CommonLoaderComponent } from '../../containers/common-loader/common-loader.component';
import { CommonFooterComponent } from '../../containers/common-footer/common-footer.component';
import { CommonProfileComponent } from '../../containers/common-profile/common-profile.component';
import {DataTableModule} from 'angular2-datatable';

// import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DatePipe } from '@angular/common';

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
  };
  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '../../safepipe';
import { FilterPipe } from '../shared-pipes/filter.pipe';

import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { CommonEmailComponent } from '../../containers/common-email/common-email.component';
import { CommonProfileViewComponent } from '../../containers/common-profile-view/common-profile-view.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { TagInputModule } from 'ngx-chips';

import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';

// import { ReportsComponent } from '../../containers/reports/reports.component';
// import { DueDeligenceComponent } from '../../containers/due-deligence/due-deligence.component';
// import { DueDeligenceAgentsComponent } from '../../containers/due-deligence-agents/due-deligence-agents.component';
// import { QualityAssuranceComponent } from '../../containers/quality-assuarance/quality-assuarance.component';
// import { TechnicalEvaluationComponent } from '../../containers/technical-evaluation/technical-evaluation.component';
// import { ManagerComponent } from '../../containers/manager/manager.component';
// import { ResultsComponent } from '../../containers/results/results.component';
// import { DueDiligenceReportComponent } from '../../containers/due-diligence-report/due-diligence-report.component';
// import { IncubationComponent } from '../../containers/incubation/incubation.component';
// import { GapAnalysisComponent } from '../../containers/gap-analysis/gap-analysis.component';
// import { GapAnalysisEnterprenuerComponent } from '../../containers/gap-analysis-enterprenuer/gap-analysis-enterprenuer.component';
// import { GapAnalysisReportComponent } from '../../containers/gap-analysis-report/gap-analysis-report.component';
// import { ApplicationComponent } from '../../containers/application/application.component';
@NgModule({
  declarations: [CommonErrorComponent, CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent,CommonProfileViewComponent,
    CommonProfileComponent,
    CommonEmailComponent,  SafePipe, FilterPipe, 
  ],
  imports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule,
    CommonModule,
    PerfectScrollbarModule,
    TabsModule, NgxPermissionsModule.forChild(),
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    ModalModule,
    DataTableModule,
    NgbModule,
    NgSelectModule,
    NgxTagsInputModule,
    TagInputModule,
    QuillModule.forRoot(),
    AccordionModule.forRoot(),
    ChartsModule,
    NgxPrintModule
    // DynamicNestedFormModule,

  ],
  exports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule,
    CommonModule,
    NgxPermissionsModule,
    PerfectScrollbarModule,
    TabsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AlertModule,
    ModalModule,
    DataTableModule,
    NgbModule,
    NgSelectModule,
    CommonErrorComponent,
    CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent,
    CommonProfileComponent,

    CommonProfileViewComponent,
    CommonEmailComponent,
SafePipe,
FilterPipe,
// DynamicNestedFormModule



  ],
  providers: [
    DatePipe
    ]

})
export class SharedModule { }

