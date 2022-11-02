import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
// import { serverurl, list_department_url, list_program_url, list_courses_url, create_name_confirmation_url, fetch_graduand_confirmation_url, list_gowns_url, check_can_pick_gowns_url, create_gown_picked_url, list_picked_gowns_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { create_attachments_url, create_details_url, delete_attachments_url, fetch_countries_url, fetch_details_url, fetch_files_url, serverurl } from '../../../app.constants';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  applicationForm: FormGroup;
 

  records = [];
  fileData: File = null;
  fileDatas = [];
  myFiles: string[] = [];
  isEditable: boolean = true;
  fileTitle = '';
  saved_files = [];
  uploaded_titles = []
  no_of_inputs = 4;
  serverurl = serverurl
  selected_lang: string = 'en';
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.applicationForm = this.formBuilder.group({
          details_of_director: new FormControl('',Validators.compose([Validators.required])),  
          board_meeting_minutes: new FormControl('',Validators.compose([Validators.required])),  
          financial_statements: new FormControl('',Validators.compose([Validators.required])),  
          tax_registration_certificate: new FormControl('',Validators.compose([Validators.required])),  
        });
    
        this.fetch_files();
  }

  ngOnInit(): void {
    this.check_language()
  }
  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }

  back(){
    this.router.navigate(['/application/proposal']);
  }

  handleFileupload(e,file_title) {
    // this.myFiles.splice(0);
    this.fileTitle = file_title;
    // this.fileData = e.target.files[0];
    // if (e.target.files.length > 3) {
    //   this.toastService.showToastNotification('error', 'Select maximum of 3 files','');
    // } else {}
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
    this.save_data();
  }



  // fetch_details() {
  //   const payload = {
  //   };
  //   this.loadingService.showloading();
  //   this.administrationService.getrecords(fetch_details_url, payload).subscribe((res) => {
  //     if (res) {
  //       this.records = res;
  //       console.log(res)
  //       if (res.length != 0) {
  //         this.records['registration_files'] = '';
  //         this.applicationForm.patchValue(this.records);
  //       } else {
          
  //       }
  //       console.log(res)
  //       this.loadingService.hideloading();
  //     }

  //   });
  // }

  fetch_files() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_files_url, payload).subscribe((res) => {
      if (res) {
        this.saved_files = res; 
        for (const file of res){
          this.title_extractor(file['title'])
        }
        console.log(res)
        this.loadingService.hideloading();
      }

    });
  }

  title_extractor(title){
    console.log(title)
    const startIndex = this.uploaded_titles.indexOf(title);
    const deleteCount = 1;

    if (startIndex !== -1) {
      // this.uploaded_titles.splice(startIndex, deleteCount);
    }else {
      this.uploaded_titles.push(title);
    }
    console.log( this.uploaded_titles)

  }

  save_data() {
    this.loadingService.showloading();
    const formData  =  new FormData();
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("documents", this.myFiles[i]);
    }
    formData.append('title', this.fileTitle);
    this.administrationService.postrecord(create_attachments_url, formData).subscribe((res) => {
      if (res) {
        for(let file of res) {
          this.saved_files.push(file)
        }        
        console.log(this.saved_files)
        this.myFiles.splice(0);
        this.loadingService.hideloading();
      }
    });
  }

  delete_file(file_id) {
    const payload = {
      "file_id": file_id
    }
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting file? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
        this.administrationService.postrecord(delete_attachments_url, payload).subscribe((res) => {
          if (res) {
            this.fetch_files();
            this.toastService.showToastNotification('success', 'Successfully Deleted','');
            this.loadingService.hideloading();
          }
        });
        }
      });
  }

  finish() {
    if (this.applicationForm.valid) {
      this.router.navigate(['/application/additional-information']);
    } else {
      console.log(this.uploaded_titles.length )
      if (this.uploaded_titles.length >= this.no_of_inputs){
        this.router.navigate(['/application/additional-information']);
      } else {
        this.toastService.showToastNotification('error', 'Please correct errors','');
        this.administrationService.markFormAsDirty(this.applicationForm);
        this.loadingService.hideloading();
      }
    }
    
  }




}
