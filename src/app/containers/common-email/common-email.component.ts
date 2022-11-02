import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { verify_email_url,resend_otp_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { Router } from '@angular/router';
const TOKEN_KEY = 'edms_token';

@Component({
  selector: 'app-common-email',
  templateUrl: './common-email.component.html',
  styleUrls: ['./common-email.component.css']
})

export class CommonEmailComponent implements OnInit {
  public VerifyEmailForm: FormGroup;
  action_required_menu = false;
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService, public router: Router,
      public loadingService: LoadingService,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
    this.VerifyEmailForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([Validators.required])),
    });
    this.action_required_menu =  this.authenticationService.requiresPasswordChange();



  }
  
 


  verifyemail() {

    if (this.VerifyEmailForm.valid) {

      const payload = {
        'otp': this.VerifyEmailForm.value['otp'],
      };

      this.loadingService.showloading();
      this.administrationService.postrecord(verify_email_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.VerifyEmailForm.reset();
          this.authenticationService.refresh_token(res['token']);
          this.sweetalertService.showAlert('Success', 'Account Verification Successful', 'success');
          this.router.navigate(['/landing/home']);
        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Kindly correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.VerifyEmailForm);

    }
  }

  resend_otp() {
      const payload={"otp":"resend"}
      this.loadingService.showloading();
      this.administrationService.postrecord(resend_otp_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.sweetalertService.showAlert('Success', 'Sent Successfully, Check Email', 'success');
        } else {
          this.loadingService.hideloading();
          this.toastService.showToastNotification('error', 'Unable to complete request', '');
        }
      });


  
  }

  ngOnInit(): void {
  }

}
