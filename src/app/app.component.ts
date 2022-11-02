import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { get_user_roles_url } from './app.constants';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public authservice: AuthenticationService, private permissionsService: NgxPermissionsService, ) {
    this.disable_console();
    this.checkifAuthenticated();


   }
   disable_console() {
    // console.log = function() {};
   }
  checkifAuthenticated() {
    let current_url = String(window.location.pathname +  window.location.search)
    console.log(current_url);
    this.authservice.authenticationState.subscribe(state => {
      if (state) {
        const payload = {

        };

        this.authservice.getrecords(get_user_roles_url, payload).subscribe((res) => {
          const all_roles = res['group_name'];
          console.log('assinged roles', all_roles);
          this.permissionsService.addPermission(all_roles, (permissionName, permissionsObject) => {
            return !!permissionsObject[permissionName];
        });
        this.router.navigate(['/landing/home']);
        // this.router.navigate(['/reports']);
        });

      } else {
        const exemptpassreset = 'authentication';
        if(current_url.search(exemptpassreset) !== -1){
          // this.router.navigate([current_url]);
          location.href.replace(location.origin, '')
        } else {
          this.router.navigate(['authentication/login']);
        }
      }

    });
  }
  fetchpermissions() {


  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }
}
