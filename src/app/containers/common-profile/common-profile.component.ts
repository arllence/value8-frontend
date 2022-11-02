import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { serverurl,get_complete_profile,create_profile_url,check_completed_profile, upload_document_url, innovation_skills_url, employment_status_url, fetch_countries_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { Country, State, City }  from 'country-state-city';
// import { element } from 'protractor';
@Component({
  selector: 'app-common-profile',
  templateUrl: './common-profile.component.html',
  styleUrls: ['./common-profile.component.css']
})
export class CommonProfileComponent implements OnInit {
  public ChangePasswordForm: FormGroup;
  CreateProfileForm: FormGroup;
  action_required_menu = false;
  newpasswordFieldType: boolean;
  current_passwordFieldType: boolean;
  confirm_passwordFieldType: boolean;
  fileData: File = null;
  picture_link = null;
  form_type = 'create';
  skills = null
  employment_status = null;
  innovation_skills = null;
  is_primary:any = null;
  selected_states = [];
  // all_countries = Country.getAllCountries();
  // all_states = State.getAllStates();
  is_underage: boolean = false;
  active = 1;

  @ViewChild('staticTabs', { static: false}) staticTabs: TabsetComponent
  countries = [];


  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
   
    this.CreateProfileForm = this.formBuilder.group({
      pic_file: new FormControl('',),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      bio: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      phonecode: new FormControl('',Validators.compose([Validators.required])),
      age_group: new FormControl('', Validators.compose([Validators.required])),
      disability: new FormControl('', Validators.compose([Validators.required])),
      level_of_education: new FormControl('', Validators.compose([Validators.required])),
      // institution_name: new FormControl('', Validators.compose([Validators.required])),
      // course_name: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      // state: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      // skills: new FormControl('', Validators.compose([Validators.required]))
    });

    this.action_required_menu =  this.authenticationService.requiresPasswordChange();
    this.check_completed_profile();
    // this.get_skills();
    this.get_employment_status();
    this.fetch_countries()



  }

  age_checker(value){
    if (value == "14-17"){
      this.is_underage = true;
    } else {
      this.is_underage = false;
    }
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
        // this.sweetalertService.showAlert('Success', 'Profile Picture updated', 'success');
      } else {
        this.loadingService.hideloading();
      }
    });
  }

  fetch_countries() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_countries_url, payload).subscribe((res) => {
      if (res) {
        console.log(res)
        this.countries = res;
        this.loadingService.hideloading();
      }

    });
  }

  get_basic_user_details() {
    const details = this.authenticationService.getuserprofileInfo().then((res) => {
      console.log(res);
      const user_info = {
        "email": res['currentemail'],
        "first_name": res['first_name'],
        "last_name": res['last_name']
      }
      this.CreateProfileForm.patchValue(user_info)
    });
  }

  get_skills(){
    const payload = {

    }
    this.administrationService.getrecords(innovation_skills_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.innovation_skills = res;
      }
    })
  }

  check_education(value){
    // console.log(value);
    if (value == 'Primary' || value == 'High School'){
      this.is_primary = true;
    } else {
      this.is_primary = false;
    }
  }

  // get_states(code){
  //   console.log(code);
  //   this.selected_states = State.getStatesOfCountry(code);
  //   console.log(Country.getCountryByCode(code));
  //   const country = Country.getCountryByCode(code)['name'];
  //   this.CreateProfileForm.patchValue({'country': country});
  // }

  get_employment_status(){
    const payload = {

    }
    this.administrationService.getrecords(employment_status_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.employment_status = res;
      }
    })
  }

  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res)
        const status = res['status'];
        if (status) {
          this.get_complete_profile();
        } else {
          this.get_basic_user_details();
        }
      }
    })
  }

  get_complete_profile(){
    const payload = {

    }
    this.administrationService.getrecords(get_complete_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        const pic_link =  res['profile_picture']['profile_picture'];
        // console.log(pic_link);
        if (pic_link && pic_link !== '' && pic_link !== undefined ){
          this.picture_link = serverurl + res['profile_picture']['profile_picture'];        
        }
        this.form_type = 'edit';
        this.skills = res['skills'];
        const user_skills = [];
        for (let skill of this.skills) {
          user_skills.push(skill.name)
        }
        // console.log(user_skills)
        this.check_education( res['profile_info']['education_level']);
        this.age_checker(res['profile_info']['age_group']);

        const user_info = {
          "email": res['user']['email'],
          "first_name": res['user']['first_name'],
          "last_name": res['user']['last_name'],
          "bio": res['profile_info']['bio'],
          "gender": res['profile_info']['gender'],
          "phone": res['profile_info']['phone'],
          "age_group": res['profile_info']['age_group'],
          "disability": res['profile_info']['disability'],
          "level_of_education": res['profile_info']['education_level'],
          "employment": res['profile_info']['employment_status'],
          "country": res['profile_info']['country'],
          "state": res['profile_info']['county'],
          "city": res['profile_info']['city'],
          "course_name": res['education']['course_name'],
          "institution_name": res['education']['institution_name'],
          
       }
        try {
          this.CreateProfileForm.patchValue(user_info);
          let code = res['profile_info']['phone'].split("-");
          code = code[0];
        //  code = code.splice(0, 1);
        //  code = code.join('');
          this.CreateProfileForm.patchValue({"phonecode":code});
        } catch (error) {
          console.log(error);
        }
       
      }
    })
  }

  create_profile(){
    if (this.CreateProfileForm.valid) {

      const payload = this.CreateProfileForm.value
      console.log(payload);
      // return true;
      this.loadingService.showloading();
      this.administrationService.postrecord(create_profile_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.CreateProfileForm.reset();
          this.sweetalertService.showAlert('Success', 'Updated Successfully. Click Apply, to submit application', 'success');
          this.router.navigate(['/landing/home']);

        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      console.log(this.CreateProfileForm.value);
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.CreateProfileForm);

    }
  }

  get_values(controls){
    const values = [];
    for (const name of controls){
      const control = this.CreateProfileForm.get(name);
      if(control.value !== ''){
        values.push(control.value);
      }
    }
    if(controls.length !== values.length){
      for (const name of controls){
        const control = this.CreateProfileForm.get(name);
        if(control.value === undefined || !control.value.trim() ){
          control.markAsDirty({ onlySelf: true });
          this.toastService.showToastNotification('error', name.toUpperCase() + ' Is Required', '');
        }
      }
      return false;
    } else {
      return true;
    }
  }

  changer(nav,id){
    if(id == 1){
      nav.select(id);
    } else if(id == 3){
      let controls = ['first_name','last_name','bio','gender','email','phonecode','phone','age_group','disability'];
      const results = this.get_values(controls);
      if(results){
        nav.select(id);
      }
    } 
  }
 

  ngOnInit(): void {
  }

}
