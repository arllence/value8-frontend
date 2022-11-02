import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';
import { ApplicationComponent } from '../application.component';
const routes: Routes = [

 
  
  {
    path: 'apply',
    component: ApplicationComponent,
    data: {
      title: 'Application',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationModuleRoutingModule { }
