

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../interfaces/administration';
import { AdministrationService } from '../services/administration.service';
import { get_emails_url, get_innovations_url } from '../../app.constants';

@Component({
  selector: 'app-retrieve-emails',
  templateUrl: './retrieve-emails.component.html',
  styleUrls: ['./retrieve-emails.component.css']
})
export class RetrieveMailsComponent implements OnInit {
  public searchForm: FormGroup;
  emailForm: FormGroup;
  dtOptions: any = {};
  records: UserList[] = [];
  department_list = [];
  searchString: string;
  department_id: any;
  graduandRecords: any;
  @ViewChild('clearanceModal') public clearanceModal: ModalDirective;
  max_Length: any;
  selected_lang: string = 'en';
  target = []
  is_single: boolean = false;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, ) {

    this.emailForm = this.formBuilder.group({
      group: new FormControl('',Validators.compose([Validators.required])),  
      target: new FormControl('',Validators.compose([Validators.required])),         
    });

  }

  

  ngOnInit(): void {
  }

  select_group(event){
    // console.log(event)
    if (event == 'SPECIFIC') {
      this.target = [
        {"name":"Specific User(s)","value":"SINGLE"}
      ]
      this.is_single = true;
    } else if (event == 'APPLICATION') {
        this.target = [
          {"name":"Complete","value":"SUBMITTED"},
          {"name":"Incomplete","value":"ONGOING"}
        ]
        this.is_single = false;
    } else if (event == 'ADMIN') {
        this.target = [
          {"name":"Managers","value":"MANAGERS"}
        ]
        this.is_single = false;
    } else if (event == 'USER') {
      this.target = [
        {"name":"Incomplete Profile","value":"INCOMPLETE_PROFILE"},
        {"name":"All Innovators","value":"INNOVATORS"}
      ]
      this.is_single = false;
  }
  }


  CheckLen(event,max,control){
    // c counts the number of words of input value
    const counter = event.target.value.split(' ').length;
    // checks if its above maximum
    if(counter > max){ 
      const form_control = this.emailForm.get(control)
      form_control.setErrors({'max_length': true})
    }
  }


  fetch_applications() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(get_innovations_url, payload).subscribe((res) => {
      if (res) {
        console.log(res)
        this.downloadFile(res)
        this.loadingService.hideloading();
      }

    });
  }

  downloadFile(data, filename = 'data_dump') {
    let csvData = this.ConvertToCSV(data, [
        'email',
    ]);
    // console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);

    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename.toLowerCase() + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  ConvertToCSV(objArray, headerList) {
    // console.log(objArray);
    // console.log(headerList);
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 's.no,';

    let newHeaders = ["Email"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }
  strRep(data) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }

  send() {
    if (this.emailForm.valid) {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed retrieving emails?').then((res) => {
        if (res) {
          const payload = {
            "data": this.emailForm.value
          } 
          this.loadingService.showloading();
          this.administrationService.postrecord(get_emails_url, payload).subscribe((res) => {
            if (res) {
              // console.log(res);
              this.sweetalertService.showAlert('Success','Emails Retrieved Successfully','success');
              this.emailForm.reset();
              this.loadingService.hideloading();
              this.downloadFile(res,payload['data']['target'] + '_email_list')
            }

          });
        }
      });
    } else {
      this.toastService.showToastNotification('error', 'Please correct errors','');
      this.administrationService.markFormAsDirty(this.emailForm);
      this.loadingService.hideloading();
    }
  }










}
