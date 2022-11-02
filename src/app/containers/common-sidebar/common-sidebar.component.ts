import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from './common-sidebar-items';
import { AuthenticationService } from '../../authentication/services/authentication.service';
@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.css']
})


export class CommonSidebarComponent {
    tenant_tag: string;
    @Input() navItems: Array<any>;
    action_required_menu = true;
    @HostBinding('class.sidebar-nav') true;
    @HostBinding('attr.role') role;
    public sidebarMinimized = true;
    defaultNavItems: Array<any>;
    constructor(public authService: AuthenticationService) {
     this.navItems = navItems;
     this.defaultNavItems = [
        {
            title: true,
            name: 'Action Required',
            permission: '',
          },

          {
            name: 'Change Password',
            url: '/profile',
            icon: 'fa fa-exclamation-triangle',
            permission: ''
          },

     ];

     this.action_required_menu  = this.authService.requiresPasswordChange();


    }

    isDivider(navItem) {
        return !!navItem.divider;
    }

    isTitle(navItem) {
        return !!navItem.title;
    }

    isHasChild(navItem) {
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
    }

}
