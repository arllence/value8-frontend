import {Component } from '@angular/core';
// import { navItems } from '../../_nav';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
action_required_layout = false;
  loggedinusername: any;
  constructor(public authService: AuthenticationService,
    private permissionsService: NgxPermissionsService, public sweetalertService: SweetalertService) {
this.fetchuserDetails();
this.action_required_layout  = this.authService.requiresPasswordChange();
  }
  fetchuserDetails() {
    let permissions = this.permissionsService.getPermissions();

    this.permissionsService.permissions$.subscribe((permissions) => {
    console.log(permissions);
});
    this.authService.getUserDetails().then((res) => {

      this.loggedinusername = res;
    });
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.sweetalertService.showConfirmation('Logout', 'Do you wish to proceed logging out?').then((res) => {
      if (res) {
        this.authService.logout();
      }

    });



  }
}
