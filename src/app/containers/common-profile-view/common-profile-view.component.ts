import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { serverurl,change_password_url,create_profile_url,check_completed_profile, upload_document_url, get_complete_profile, create_certification_url,get_certifications_url, delete_certification_url, create_association_url,get_associations_url, delete_association_url,
create_hobby_url,get_hobbies_url, delete_hobby_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
// import { element } from 'protractor';
@Component({
  selector: 'app-common-profile',
  templateUrl: './common-profile-view.component.html',
  styleUrls: ['./common-profile-view.component.css']
})
export class CommonProfileViewComponent implements OnInit {
  public ChangePasswordForm: FormGroup;
  CreateProfileForm: FormGroup;
  AddCertificationForm: FormGroup;
  AddAssociationForm: FormGroup;
  AddHobbyForm: FormGroup;
  action_required_menu = false;
  newpasswordFieldType: boolean;
  current_passwordFieldType: boolean;
  confirm_passwordFieldType: boolean;
  fileData: File = null;
  picture_link = null;
  profile_info = null;
  add_cert = false;
  add_association = false;
  cert_id = null;
  association_id = null;
  hobby_id = null;
  add_hobby = false;

  
  constructor(private formBuilder: FormBuilder,
    public router: Router,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
    this.ChangePasswordForm = this.formBuilder.group({
      current_password: new FormControl('', Validators.compose([Validators.required])),
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
    });

    this.CreateProfileForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      bio: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      id_number: new FormControl('', Validators.compose([Validators.required])),
      age_group: new FormControl('', Validators.compose([Validators.required])),
      disability: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      state: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      postal: new FormControl('', Validators.compose([Validators.required])),
      level_of_education: new FormControl('', Validators.compose([Validators.required])),
      employment: new FormControl('', Validators.compose([Validators.required])),
      skills: new FormControl('', Validators.compose([Validators.required]))
    });

    this.AddCertificationForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      expiration_date: new FormControl('',)
    });

    this.AddAssociationForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required]))
    });

    this.AddHobbyForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required]))
    });

    this.action_required_menu =  this.authenticationService.requiresPasswordChange();
    this.get_basic_user_details();
    this.check_completed_profile();



  }
  handleFileupload(e) {
    this.fileData = e.target.files[0];
    const formData  =  new FormData();
    formData.append('document', this.fileData);
    formData.append('documentType', 'profile_picture');

    this.administrationService.postrecord(upload_document_url, formData).subscribe((res) => {
      if (res) {
        this.picture_link = serverurl + res['url_link'];
        // console.log(this.picture_link);
        this.sweetalertService.showAlert('Success', 'Profile Picture updated', 'success');
      } else {
        this.loadingService.hideloading();
      }
    });
  }

  get_basic_user_details() {
    const details = this.authenticationService.getuserprofileInfo().then((res) => {
      // console.log(res);
      const user_info = {
        "email": res['currentemail'],
        "first_name": res['first_name'],
        "last_name": res['last_name']
      }
      this.CreateProfileForm.patchValue(user_info)
    });
  }

  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        const status = res['status'];
        if (status === false) {
          this.router.navigate(['/profile']);
        } else {
          this.get_complete_profile();
        }
      }
    })
  }

  update_profile(){
    this.router.navigate(['/profile']);
  }

  add_certification(){
    this.add_cert = !this.add_cert;
  }

  toggle_association(){
    this.add_association = !this.add_association
  }

  toggle_hobby(){
    this.add_hobby = !this.add_hobby
  }

  get_complete_profile(){
    const payload = {

    }
    this.administrationService.getrecords(get_complete_profile,payload).subscribe((res) => {
      if(res) {
        console.log(res)
        const pic_link =  res['profile_picture']['profile_picture'];
        // console.log(pic_link);
        if (pic_link && pic_link !== '' && pic_link !== undefined ){
          this.picture_link = serverurl + res['profile_picture']['profile_picture'];        
        }
        this.profile_info = res;    
        const user_info = {
          "bio": res['profile_info']['bio'],
          "gender": res['profile_info']['gender'],
          "phone": res['profile_info']['phone'],
          "id_number": res['profile_info']['id_number'],
          "age_group": res['profile_info']['age_group'],
          "disability": res['profile_info']['disability'],
          "country": res['profile_info']['country'],
          "state": res['profile_info']['state'],
          "city": res['profile_info']['city'],
          "address": res['profile_info']['address'],
          "postal": res['profile_info']['postal_code'],
          "level_of_education": res['profile_info']['education_level'],
          "employment": res['profile_info']['employment_status'],
          "skills": res['skills']
        }    
      }
    })
  }
 
  togglenewpasswordFieldType() {
    this.newpasswordFieldType = !this.newpasswordFieldType;
  }
  togglecurrent_passwordFieldType() {
    this.current_passwordFieldType = !this.current_passwordFieldType;
  }
  toggleconfirm_passwordFieldType() {
    this.confirm_passwordFieldType = !this.confirm_passwordFieldType;
  }

  get_certifications(){
    const payload = {

    }
    this.administrationService.getrecords(get_certifications_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.add_cert = false;
        this.profile_info.certification = res;
      }
    })
  }

  edit_certification(id,name,expiration_date){
    const data = {
      "name":name,
      "expiration_date":expiration_date
    }
    this.AddCertificationForm.patchValue(data);
    this.add_cert = true;
    this.cert_id = id;
  }

  delete_certification(id){
    const payload = {
      "cert_id" : id
    }
    this.sweetalertService.showConfirmation('Confirmation','Do you wish to proceed deleting record?').then((res) => {
      if(res){
        this.administrationService.postrecord(delete_certification_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.get_certifications();
            this.sweetalertService.showAlert('Success', 'Deleted Successfully', 'success');
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    })
    
  }

  save_certification(){
    if (this.AddCertificationForm.valid) {

      const payload = this.AddCertificationForm.value
      if(this.cert_id !== null){
        payload['cert_id'] = this.cert_id;
      }
      console.log(payload)
      this.loadingService.showloading();
      this.administrationService.postrecord(create_certification_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.cert_id = null;
          this.add_cert = false;
          this.get_certifications();
          this.AddCertificationForm.reset();
          this.sweetalertService.showAlert('Success', 'Saved Successfully', 'success');
        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.AddCertificationForm);

    }
  }

  // ASSOCIATION

  get_associations(){
    const payload = {

    }
    this.administrationService.getrecords(get_associations_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.add_association = false;
        this.profile_info.association = res;
      }
    })
  }

  edit_association(id,name,role){
    const data = {
      "name":name,
      "role":role
    }
    this.AddAssociationForm.patchValue(data);
    this.add_association = true;
    this.association_id = id;
  }

  delete_association(id){
    const payload = {
      "association_id" : id
    }
    this.sweetalertService.showConfirmation('Confirmation','Do you wish to proceed deleting record?').then((res) => {
      if(res){
        this.administrationService.postrecord(delete_association_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.get_associations();
            this.sweetalertService.showAlert('Success', 'Deleted Successfully', 'success');
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    })
    
  }

  save_association(){
    if (this.AddAssociationForm.valid) {

      const payload = this.AddAssociationForm.value
      if(this.association_id !== null){
        payload['association_id'] = this.association_id;
      }
      console.log(payload)
      this.loadingService.showloading();
      this.administrationService.postrecord(create_association_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.association_id = null;
          this.add_association = false;
          this.get_associations();
          this.AddAssociationForm.reset();
          this.sweetalertService.showAlert('Success', 'Saved Successfully', 'success');
        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.AddAssociationForm);

    }
  }
  

  // HOBBIES
  get_hobbies(){
    const payload = {

    }
    this.administrationService.getrecords(get_hobbies_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.add_hobby = false;
        this.profile_info.hobby = res;
      }
    })
  }

  edit_hobby(id,name){
    const data = {
      "name":name
    }
    this.AddHobbyForm.patchValue(data);
    this.add_hobby = true;
    this.hobby_id = id;
  }

  delete_hobby(id){
    const payload = {
      "hobby_id" : id
    }
    this.sweetalertService.showConfirmation('Confirmation','Do you wish to proceed deleting record?').then((res) => {
      if(res){
        this.administrationService.postrecord(delete_hobby_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.get_hobbies();
            this.sweetalertService.showAlert('Success', 'Deleted Successfully', 'success');
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    })
    
  }

  save_hobby(){
    if (this.AddHobbyForm.valid) {

      const payload = this.AddHobbyForm.value
      if(this.hobby_id !== null){
        payload['hobby_id'] = this.hobby_id;
      }
      console.log(payload)
      this.loadingService.showloading();
      this.administrationService.postrecord(create_hobby_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.hobby_id = null;
          this.add_hobby = false;
          this.get_hobbies();
          this.AddHobbyForm.reset();
          this.sweetalertService.showAlert('Success', 'Saved Successfully', 'success');
        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.AddHobbyForm);

    }
  }

  create_profile(){
    if (this.CreateProfileForm.valid) {

      const payload = this.CreateProfileForm.value
      // console.log(payload)
      this.loadingService.showloading();
      this.administrationService.postrecord(create_profile_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.CreateProfileForm.reset();
          this.sweetalertService.showAlert('Success', 'Profile Updated Successfully', 'success');

        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.CreateProfileForm);

    }
  }

  changepassword() {

    if (this.ChangePasswordForm.valid) {

      const payload = {
        'current_password': this.ChangePasswordForm.value['current_password'],
        'new_password': this.ChangePasswordForm.value['new_password'],
        'confirm_password': this.ChangePasswordForm.value['confirm_password']
      };
      this.loadingService.showloading();
      this.administrationService.postrecord(change_password_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.ChangePasswordForm.reset();
          this.sweetalertService.showAlert('Success', 'Password Has been Changed Successfully,Log out to effect', 'success');
          this.authenticationService.logout();

          // this.authenticationService.logout();

        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.ChangePasswordForm);

    }
  }

  ngOnInit(): void {
  }

}
