import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(public http: HttpClient) { }
  getrecords(endpointurl,payload){
    let options = {
      params : payload
    };
    return this.http.get<[]>(endpointurl,options);

  }
  postrecord(endpointurl,payload){
 
    return this.http.post<[]>(endpointurl, payload);
  }
  markFormAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
    
      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

}
