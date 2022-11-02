import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralReportsComponent } from '../general/container/general/general-report.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
import { ReviewersReportsComponent } from '../general/container/reviewers/reviewers-report.component';
import { EvaluationReportsComponent } from '../general/container/evaluation/evaluation-report.component';
// import { GeneralSubmissionComponent } from '../general/container/reports/submission-report.component';

const routes: Routes = [

 
  {
    path: 'applications',
    component: GeneralReportsComponent,
    data: {
      title: 'Applications',
      permissions: {
        only: ['MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'reviewers',
    component: ReviewersReportsComponent,
    data: {
      title: 'Reviewers',
      permissions: {
        only: ['MANAGER','SUPER_ADMIN'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'evaluation',
    component: EvaluationReportsComponent,
    data: {
      title: 'Evaluation Report',
      permissions: {
        only: ['MANAGER','SUPER_ADMIN'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
