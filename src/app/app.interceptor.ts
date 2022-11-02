import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from './error.interceptor';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private errorHandler:ErrorHandler,private route: ActivatedRoute) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const exemptappconfig = '/assets';
    const exemptlogin = 'authentication/login';
    const exemptpassreset = 'authentication/reset-password';
    const exemptsignup = 'authentication/create-account';
    const exemptverifyemail = 'authentication/verify-email';
    const exemptresendotp = 'authentication/resend-otp';
    const exemptsendresetlink = 'authentication/send-password-reset-link';
    const exemptresetlink = 'authentication/reset-user-password';
    const exemptgeneral = 'general';
    const exemptauth = 'authentication';
    const exemptlanding = 'challenge/apply';
   
    // exempting the login url from inteception
    if(request.url.search(exemptappconfig) !== -1 || request.url.search(exemptlogin) !== -1 || request.url.search(exemptsignup) !== -1 || request.url.search(exemptverifyemail) !== -1 || request.url.search(exemptresendotp) !== -1 || request.url.search(exemptpassreset) !== -1 || request.url.search(exemptsendresetlink) !== -1 || request.url.search(exemptresetlink) !== -1 || request.url.search(exemptgeneral) !== -1 || request.url.search(exemptlanding) !== -1 || request.url.search(exemptauth) !== -1){

        // return next.handle(request);
        return next.handle(request)
    .pipe(catchError((err: any) => {
      console.log("logged",err)
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.handleError(err);
        }

      return new Observable<HttpEvent<any>>();
    }));
        
    }
    else{
        request = request.clone({
            setHeaders: {
              Authorization: 'Bearer '+ localStorage.getItem('edms_token'),
            }
          });
          return next.handle(request)
    .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.handleError(err);
        }

      return new Observable<HttpEvent<any>>();
    }));
    }
    



  }
}