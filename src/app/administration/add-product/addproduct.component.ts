
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { AdministrationService } from '../services/administration.service';
import { create_product_url, list_user_roles, } from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})

export class AddProductComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list: [] = [];

  productForm: FormGroup;
  is_other_group: boolean = false;
  groups = [];
  applications: any;
  user_list: any;
  constructor(private formBuilder: FormBuilder, public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService) {
      this.productForm = this.formBuilder.group({
        name: new FormControl('',Validators.compose([Validators.required])),  
        quantity: new FormControl('',Validators.compose([Validators.required ])),  
        reorder_min: new FormControl('',Validators.compose([Validators.required])),            
      });
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.fetchallroles();
    // this.populateform();
}

  switcher(event){
    if (event == 'other') {
      this.is_other_group = true;
    }
  }

 fetchallroles() {
   const payload = {
   };
   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
     for (const record of res) {
      this.user_roles_list.push(record);
     }
    //  console.log(this.user_roles_list)
   });
 }

  

  addProduct() {
    const payload = this.productForm.value;
    console.log(payload)
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_product_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','Added Successfully.','success');
            this.productForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });

      }

    });

  }
}

