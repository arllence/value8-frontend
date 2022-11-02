import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { AdditionalInformationComponent } from '../container/additional-information/additional-information.component';
import { ApplicationDetailsComponent } from '../container/application-details/application-details.component';
import { AttachmentsComponent } from '../container/attachments/attachments.component';
import { DeclarationComponent } from '../container/declaration/declaration.component';
import { EligibilityComponent } from '../container/eligibility/eligibility.component';
import { ProposalComponent } from '../container/proposal/proposal.component';
import { ApplicationReviewComponent } from '../container/review/review.component';

const routes: Routes = [
  {
    path: 'eligibility',
    component: EligibilityComponent,
    data: {
      title: 'Eligibility',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'details',
    component: ApplicationDetailsComponent,
    data: {
      title: 'Application Details',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'proposal',
    component: ProposalComponent,
    data: {
      title: 'Proposal',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'additional-information',
    component: AdditionalInformationComponent,
    data: {
      title: 'Additional Information',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'declaration',
    component: DeclarationComponent,
    data: {
      title: 'Declaration',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'attachments',
    component: AttachmentsComponent,
    data: {
      title: 'Attachments',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'review/:creator_id',
    component: ApplicationReviewComponent,
    data: {
      title: 'Application Review',
      permissions: {
        only: ['INNOVATOR','MANAGER','SUPER_USER','SCREENER','EVALUATOR','JURY'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GownsOfficerRoutingModule { }
