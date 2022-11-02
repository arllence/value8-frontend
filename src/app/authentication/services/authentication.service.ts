
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { loginurl,signupurl } from '../../app.constants';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { decode } from 'punycode';
import { NgxPermissionsService } from 'ngx-permissions';
const TOKEN_KEY = 'edms_token';

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  divider?: boolean;
  class?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  user = null;
  authenticationState = new BehaviorSubject(false);
  changepasswordState = new BehaviorSubject(false);
  verifyemailState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private helper: JwtHelperService, private permissionsService: NgxPermissionsService, ) {
    this.checkToken();
  }
  flushuserpermissions() {
    this.permissionsService.flushPermissions();
  }
  checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        this.user = decoded;
        this.verifyemailState.next(this.user['verified_email']);
        this.authenticationState.next(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }


    }
  }
  
  getUserDetails() {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem(TOKEN_KEY);
      const decoded = this.helper.decodeToken(token);
      if (token) {
        const user = decoded;
        const currentemail = user['email'];

        resolve(currentemail);

      } else {
        reject('No USER');

      }
    });

  }
  getuserprofileInfo() {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem(TOKEN_KEY);
      const decoded = this.helper.decodeToken(token);
      if (token) {
        const user = decoded;
        const name = user['name'];
        const superuser = user['superuser'];
        const user_id = user['id'];
        const currentemail = user['email'];
        const first_name = user['first_name'];
        const last_name = user['last_name'];
        const password_change_status = user['password_change_status'];
        const verify_password = user['verified_email'];
        this.changepasswordState.next(password_change_status);
        this.verifyemailState.next(verify_password);



        const response_info = {
          'superuser': superuser,
          'user_id':  user_id,
          'currentemail': currentemail,
          'name': name,
          'first_name': first_name,
          'last_name': last_name
        };


        resolve(response_info);




      } else {
        reject('No USER');

      }
    });

  }

  // authenticate(res){
  //   const token = res['token'];
  //   localStorage.setItem(TOKEN_KEY, res['token']);
  //   this.user = this.helper.decodeToken(res['token']);
  //   this.changepasswordState.next(this.user['password_change_status']);
  //   this.verifyemailState.next(this.user['verified_email']);
  //   this.authenticationState.next(true);
  //   return true;
  // }

  login(credentials) {
    // flush all permissions just in case
    this.flushuserpermissions();
    return this.http.post(loginurl, credentials)
      .pipe(
        tap(res => {
          // console.log(res);
          // const authenticate = this.authenticate(res);
          // if(authenticate){
          //   return true;
          // }
          if(res['verified_email'] == false){
            return 'unverified';
          } else {
            const token = res['token'];
            localStorage.setItem(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
            this.changepasswordState.next(this.user['password_change_status']);
            this.verifyemailState.next(this.user['verified_email']);
            this.authenticationState.next(true);
            return true;
          }
          



        }),
        catchError(e => {

          const error: any = e.error;

          const status = error.code;
          const message = error.message;
          // this.alertService.showAlert('Error',message,'error');

          throw new Error(e.error);


        })
      );
  }

  refresh_token(token){
    console.log(token);
    localStorage.setItem(TOKEN_KEY, token);
    this.verifyemailState.next(true);
    return true;
  }

  signup(payload) {
    return this.http.post(signupurl, payload)
      .pipe(
        tap(res => {
          // const authenticate = this.authenticate(res);
          // if(authenticate){
          //   return true;
          // }
          // console.log(res);
          // this.alertService.showAlert('Error',message,'error');
          // const token = res['token'];
          // localStorage.setItem(TOKEN_KEY, res['token']);
          // this.user = this.helper.decodeToken(res['token']);
          // this.changepasswordState.next(this.user['password_change_status']);
          // this.authenticationState.next(true);
          // return true;



        }),
        catchError(e => {

          const error: any = e.error;

          const status = error.code;
          const message = error.message;
          // console.log(message);
          // this.alertService.showAlert('Error',message,'error');

          throw new Error(e.error);


        })
      );
  }

  logout() {
    this.flushuserpermissions();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('RFILTER');
    localStorage.clear();

    this.authenticationState.next(false);
    window.location.reload();
  }



  isAuthenticated() {
    return this.authenticationState.value;
  }
  requiresPasswordChange() {
    return this.changepasswordState.value;
  }
  verifyEmail() {
    return this.verifyemailState.value;
  }


  passwordreset(endpoint, postdata) {

    return this.http.post<NavData>(endpoint, postdata).pipe(map(res => {
      const response: any = res;
      const code = response.code;
      const message = response.message;

      if (code == 200) {
        return response.recordsfound;

      } else {
        return [];

      }

    }),
      catchError(e => {
        const error: any = e.error;


        const status = error.code;
        const message = error.message;
        // this.alertService.showAlert('Error',message,'error');

        throw new Error(e.error);


      })
    );

  }
  getrecords(endpointurl, payload) {
    const options = {
      params: payload
    };
    return this.http.get<[]>(endpointurl, options);

  }



}
