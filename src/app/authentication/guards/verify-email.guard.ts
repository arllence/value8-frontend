
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})

export class VerifyEmailGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthenticationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const verify_email  = this.authService.verifyEmail();
    if (verify_email) {
      return true;
    } else  {
      this.router.navigate(['/email']);
      return false;
    }
  }

}


