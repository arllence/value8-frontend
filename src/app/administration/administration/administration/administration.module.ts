import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../../common-module/common-module/common-module.module';

import { DynamicNestedFormModule } from '../../../dynamic-nested-form/dynamic-nested-form.module';
import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';

import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { DocumentTypeListingComponent } from '../../department-management/document-type-listing/document-type-listing.component';
import { DocumentFieldListingComponent } from '../../department-management/document-field-listing/document-field-listing.component';
import { MeetingLinkComponent } from '../../meeting-link/meeting-link.component';
import { CommunicationComponent } from '../../communication/communication.component';
import { RetrieveMailsComponent } from '../../retrieve-emails/retrieve-emails.component';
import { RetrieveApplicationsComponent } from '../../retrieve-applications/retrieve-applications.component';
import { ReassignComponent } from '../../re-assign/reassign.component';
import { JuryGroupsComponent } from '../../jury-groups/jury-groups.component';
@NgModule({
  declarations: [
    StaffregistrationComponent,
    StafflistingComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    DocumentTypeListingComponent,
    DocumentFieldListingComponent,
    MeetingLinkComponent, 
    CommunicationComponent, 
    RetrieveMailsComponent,
    RetrieveApplicationsComponent,
    ReassignComponent,
    JuryGroupsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,DynamicNestedFormModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
