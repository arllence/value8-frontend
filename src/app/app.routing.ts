import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { CommonProfileComponent } from './containers/common-profile/common-profile.component';
import { AuthenticationGuard } from './authentication/guards/authguard.guard';
import { ChangePasswordGuard } from './authentication/guards/change-password.guard';
import { VerifyEmailGuard } from './authentication/guards/verify-email.guard';
import { CommonEmailComponent } from './containers/common-email/common-email.component';
import { CommonProfileViewComponent } from './containers/common-profile-view/common-profile-view.component';


export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P403Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication/authentication.module').then(m => m.AuthenticationModule
    )
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        component: CommonProfileComponent,
        data: {
          title: 'Profile Update'
        },
        canActivate: [AuthenticationGuard]
        // canActivate: [AuthenticationGuard,VerifyEmailGuard]
      },
      {
        path: 'user-profile',
        component: CommonProfileViewComponent,
        data: {
          title: 'Profile Details'
        },
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'email',
        component: CommonEmailComponent,
        data: {
          title: 'Verify Email'
        }
      },
      {
        path: '',
        redirectTo: '/landing/home', pathMatch: 'full'
      },
      {
        path: 'landing',
        loadChildren:
        () => import('./landing/landing/landing.module').then(m => m.LandingModule),
        canActivate: [AuthenticationGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'administration',
        loadChildren:
        () => import('./administration/administration/administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'application',
        loadChildren:
        () => import('./application/module/application.module').then(m => m.ApplicationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'reports',
        loadChildren:
        () => import('./reports/module/general.module').then(m => m.GeneralModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'analytics',
        loadChildren:
        () => import('./analytics/module/analytics.module').then(m => m.AnalyticsModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'evaluation',
        loadChildren:
        () => import('./evaluation/module/evaluation.module').then(m => m.EvaluationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      }
        
    ]
  },
  





  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }