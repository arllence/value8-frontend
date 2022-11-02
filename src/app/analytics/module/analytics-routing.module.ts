import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { AnalyticsComponent } from '../container/analytics.component';
import { DroppedAnalyticsComponent } from '../container/dropped/dropped.component';
import { EvaluatedAnalyticsComponent } from '../container/evaluated/evaluated.component';

const routes: Routes = [

 
  {
    path: 'general',
    component: AnalyticsComponent,
    data: {
      title: 'General Analytics',
      permissions: {
        only: ['MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dropped',
    component: DroppedAnalyticsComponent,
    data: {
      title: 'Dropped Analytics',
      permissions: {
        only: ['MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'evaluated',
    component: EvaluatedAnalyticsComponent,
    data: {
      title: 'Evaulated Analytics',
      permissions: {
        only: ['MANAGER'],
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
export class AnalyticsRoutingModule { }
