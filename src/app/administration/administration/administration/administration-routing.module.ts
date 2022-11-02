import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';

import { ChangePasswordGuard } from '../../../authentication/guards/change-password.guard';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MeetingLinkComponent } from '../../meeting-link/meeting-link.component';
import { CommunicationComponent } from '../../communication/communication.component';
import { RetrieveMailsComponent } from '../../retrieve-emails/retrieve-emails.component';
import { RetrieveApplicationsComponent } from '../../retrieve-applications/retrieve-applications.component';
import { ReassignComponent } from '../../re-assign/reassign.component';
import { JuryGroupsComponent } from '../../jury-groups/jury-groups.component';
const routes: Routes = [
  
  {
    path: 'staff-registration',
    component: StaffregistrationComponent,
    data: {
      title: 'Staff Registration',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'staff-listing',
    component: StafflistingComponent,
    data: {
      title: 'Staff Listing',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'staff-details/:id',
    component: StaffDetailsComponent,
    data: {
      title: 'Staff Details',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 're-assign',
    component: ReassignComponent,
    data: {
      title: 'Re-Assign',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'meeting-links',
    component: MeetingLinkComponent,
    data: {
      title: 'Meeting Links',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'send-email',
    component: CommunicationComponent,
    data: {
      title: 'Send Mails',
      permissions: {
        only: ['USER_MANAGER', 'MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'retrieve-mails',
    component: RetrieveMailsComponent,
    data: {
      title: 'Retrieve Mails',
      permissions: {
        only: ['USER_MANAGER', 'MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'retrieve-applications',
    component: RetrieveApplicationsComponent,
    data: {
      title: 'Retrieve Applications',
      permissions: {
        only: ['USER_MANAGER', 'MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'jury-groups',
    component: JuryGroupsComponent,
    data: {
      title: 'Create Jury Group',
      permissions: {
        only: ['USER_MANAGER', 'MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
