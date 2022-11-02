import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../validators/authentication.messages';
import { NameValidator, PasswordValidator, OtpValidator } from '../validators/authentication.validators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { verify_email_url,resend_otp_url,reset_password_page_url,send_password_reset_link_url,user_reset_password_url, fetch_meeting_url, fetch_general_meeting_url } from '../../app.constants';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm: FormGroup;
  public SignupForm: FormGroup;
  public VerifyEmailForm: FormGroup;
  public resetPasswordForm: FormGroup;
  validation_messages: any;
  submitted: false;
  passwordFieldType: boolean;
  loginformstatus: any;
  signupformstatus:any;
  is_login:any = true;
  verify_email:any = false;
  user_email = null
  gender_list = ['Male', 'Female']
  roles = ["INNOVATOR"]
  reasons = ['AfriLabs','Word of Mouth', 'Google Search','Social Media', 'Television', 'Radio', 'Through friend or Colleague','Other']
  hear_about_us = false;
  other_field: boolean;
  reset_password = false;
  links = [];
  @ViewChild('langModal') public langModal: ModalDirective;
  selected_lang: any = 'en';

  constructor(private toastService: ToastService, private router: Router,
     private formBuilder: FormBuilder, public administrationService: AdministrationService, public sweetalertService: SweetalertService, public authservice: AuthenticationService,
     public loadingService: LoadingService) {
    // login form
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('',
      Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40)])),
      password: new FormControl('',
       Validators.compose([PasswordValidator.validPassword, Validators.required, Validators.minLength(3), Validators.maxLength(40)])),
    });

    // signup form
    this.SignupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40)])),
      last_name: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40)])),
      // phone_number: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[- +()0-9]+')])),
      // gender: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40)])),
      hear_about_us: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40)])),
      hear_about_us_other: new FormControl('', ),
      register_as: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(1), Validators.maxLength(40)])),
      newsletter: new FormControl(false,),
      accepted_terms: new FormControl('',),
      email: new FormControl('', Validators.compose([NameValidator.validName, Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
      password: new FormControl('', Validators.compose([PasswordValidator.validPassword, Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
      confirm_password: new FormControl('',Validators.compose([PasswordValidator.validPassword, Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    });

    this.VerifyEmailForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
    });

    this.resetPasswordForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
    });



    this.validation_messages = ValidationErrorMessages.validationMessages;
  }

  ngOnInit(): void {
    this.fetchMeetings();
  }
  ngAfterViewInit(){
    this.check_language()
  }

  handle_lang(lang){
    console.log(lang);
    localStorage.setItem("LOCALE", lang);
    this.selected_lang = lang;
    this.langModal.hide()
    // localStorage.removeItem(TOKEN_KEY);
    // window.location.reload();
  }
  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    } else {
      this.langModal.show()
    }
  }

  listener_switcher(variable,value){
    if(variable == 'hear_about_us'){
      if (value == 'Other'){
        this.hear_about_us = true;
      } else {
        this.hear_about_us = false;
      }
    }
  }

  fetchMeetings() {
    const payload = {
    };
    this.administrationService.getrecords(fetch_general_meeting_url, payload).subscribe((res) => {
      this.links = res;
    });
  }

  is_login_fn() {
    this.is_login = !this.is_login
  }

  is_reset_password_fn() {
    if(this.reset_password){
      this.reset_password = false;
      this.verify_email = false;
    } else {
      this.verify_email = null;
      this.reset_password = true;
    }
  }

  showPassword() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      this.loadingService.showloading();
      const credentials = {
        'email': this.LoginForm.value['email'],
        'password': this.LoginForm.value['password'],
      };
      this.authservice.login(credentials).subscribe((data) => {
        if (data) {
          // console.log(data);
          if(data['verified_email'] == false){
            this.verify_email = true;
            this.VerifyEmailForm.patchValue(data);
            this.toastService.showToastNotification('warning', 'Activate Your Account', '');
          }else {
            this.toastService.showToastNotification('success', 'Login Successful', '');
          }
        } else {
          this.toastService.showToastNotification('error', 'Could Not Authenticate You', '');
        }
        this.loadingService.hideloading();
      });
    } else {
      this.loginformstatus = true;
      this.toastService.showToastNotification('error', 'Fill in the blanks', '');
    }
  }

  onSignup() {
    if (this.SignupForm.valid) {

      const payload = this.SignupForm.value;

      if(payload['hear_about_us'] === 'Other' && payload['hear_about_us_other'] === ""){
        // if(payload['hear_about_us_other'] === ""){
          this.toastService.showToastNotification('error', 'Fill `How did you hear about us?` Field', '');
          this.other_field = true;
        // }
      } else {
        this.loadingService.showloading();
        this.authservice.signup(payload).subscribe((data) => {
          if (data) {
            // this.verify_email = true;
            this.is_login = true;
            this.user_email = data['email'];
            this.LoginForm.patchValue(data);
            // this.VerifyEmailForm.patchValue(data);
            this.SignupForm.reset();
            // this.sweetalertService.showAlert('Success', 'Check Your Email Inbox/Spam folder For Acount Activation Code.', 'success');
            this.sweetalertService.showAlert('Success', 'Login/Enter your password to continue.', 'success');
          } else {
            this.toastService.showToastNotification('error', 'Could Not Create Account', '');
          }
          this.loadingService.hideloading();
        });
      }
    } else {
      console.log(this.SignupForm.value);
      this.signupformstatus = true;
      this.toastService.showToastNotification('error', 'Fill in the blanks', '');

    }
  }


  verifyemail() {

    if (this.VerifyEmailForm.valid) {

      const payload = this.VerifyEmailForm.value;

      this.loadingService.showloading();
      this.administrationService.postrecord(verify_email_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.VerifyEmailForm.reset();
          this.is_login = true;
          this.verify_email = false;
          this.sweetalertService.showAlert('Success', 'Account Verification Successful', 'success');
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
    const payload= this.VerifyEmailForm.value;
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

  sendPasswordLink() {
    let payload = this.resetPasswordForm.value;
    let current_url = window.location.href;
    var re = /login/gi; 
    var serverurl = current_url.replace(re, "reset-password"); 
    payload['serverurl'] = serverurl;
    console.log(payload);
    this.loadingService.showloading();
    this.administrationService.postrecord(send_password_reset_link_url, payload).subscribe((res) => {
      if (res) {
        this.loadingService.hideloading();
        this.sweetalertService.showAlert('Success', 'Reset Link Sent Successfully, Check Email', 'success');
      } else {
        this.loadingService.hideloading();
        this.toastService.showToastNotification('error', 'Unable to complete request', '');
      }
    });
  }









}
