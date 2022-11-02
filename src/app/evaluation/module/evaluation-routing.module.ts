import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { EvaluationComponent } from '../container/evaluation/evaluation.component';
import { JuryComponent } from '../container/jury/jury.component';
import { ApplicationReviewComponent } from '../container/review/review.component';

const routes: Routes = [
  {
    path: 'evaluate/:application_id',
    component: EvaluationComponent,
    data: {
      title: 'Evaluate',
      permissions: {
        only: ['MANAGER','EVALUATOR','SUPER_ADMIN'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'jury/:application_id',
    component: JuryComponent,
    data: {
      title: 'Jury Evaluation',
      permissions: {
        only: ['MANAGER','JURY','SUPER_ADMIN'],
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
        only: ['INNOVATOR','MANAGER','SUPER_USER'],
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
export class EvaluationRoutingModule { }
