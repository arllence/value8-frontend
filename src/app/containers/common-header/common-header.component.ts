import {Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  public sidebarMinimized = false;
  loggedinemail: any;
  loggedinname: any;
  YouthADAPT = 0;
  selected_lang = 'en';
  @ViewChild('langModal') public langModal: ModalDirective;

  constructor(private router: Router, public authService: AuthenticationService, public sweetalertService: SweetalertService) {

    this.fetchuserDetails();
    

  }
  ngAfterViewInit(){
    this.remove();
    this.check_language()
  }
  remove(){
    let button2 = document.getElementsByClassName('navbar-toggler');
    button2[2].remove();
  }
  handle_lang(lang){
    // console.log(lang);
    localStorage.setItem("LOCALE", lang);
    this.selected_lang = lang;
    this.langModal.hide()
    // localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  }
  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    } else {
      this.langModal.show()
    }
  }

  fetchuserDetails() {
    this.authService.getuserprofileInfo().then((res) => {
      console.log(res);
      this.loggedinemail = res['currentemail'];
      this.loggedinname = res['name'];
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  changepassword() {
    // this.router.navigate(['profile']);
    this.router.navigate(['/user-profile']);
  }

  logout() {
    this.sweetalertService.showConfirmation('Logout', 'Do you wish to proceed logging out?').then((res) => {
      if (res) {
        this.authService.logout();
      }

    });
  }
}
