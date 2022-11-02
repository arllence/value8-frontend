import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../validators/authentication.messages';
import { NameValidator, PasswordValidator, OtpValidator } from '../validators/authentication.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { verify_email_url,resend_otp_url,user_reset_password_url } from '../../app.constants';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  validation_messages: any;
  submitted: false;
  passwordFieldType: boolean;
  loginformstatus: any;
  signupformstatus:any;
  otp: any;
  email: any;

  constructor(private toastService: ToastService, private router: Router,
    private formBuilder: FormBuilder, public administrationService: AdministrationService, public sweetalertService: SweetalertService, public authservice: AuthenticationService,
    public loadingService: LoadingService, private route: ActivatedRoute) {

    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
    });
    this.otp = this.route.snapshot.paramMap.get('otp');
    this.route.queryParams.subscribe(params => {
      this.otp = params['otp'];
      this.email = params['email'];
    });
    this.print(this.otp);
    this.validation_messages = ValidationErrorMessages.validationMessages;
  }

  ngOnInit(): void {
    
  }

  print(to_print){
    console.log(to_print);
  }

  showPassword() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  resetPassword() {

    if (this.resetPasswordForm.valid) {

      let payload = this.resetPasswordForm.value;
      payload['otp'] = this.otp
      payload['email'] = this.email

      this.loadingService.showloading();
      this.administrationService.postrecord(user_reset_password_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.resetPasswordForm.reset();
          this.router.navigate(['authentication/login']);
          this.sweetalertService.showAlert('Success', 'Password Reset Successful. You Can Now Login', 'success');
        } else {
          this.loadingService.hideloading();
        }
      });
    } else {
      this.toastService.showToastNotification('error', 'Kindly correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.resetPasswordForm);
    }
  }

}

