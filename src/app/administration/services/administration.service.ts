
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(public http: HttpClient) { }
  getrecords(endpointurl, payload) {
    const options = {
      params : payload
    };
    return this.http.get<[]>(endpointurl, options);

  }
  postrecord(endpointurl, payload) {

    return this.http.post<[]>(endpointurl, payload);
  }
  deleterecord(endpointurl, params) {
    const options = {
      params : params
    };
    const serverurl = endpointurl;

    return this.http.delete<[]>(serverurl, options);

  }
  updaterecord(endpointurl, params) {
    const serverurl = endpointurl;

    return this.http.put<[]>(serverurl, params);

  }

  markFormAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
  getreverseBoolean(value) {
    switch (value) {
         case true:
             return 'true';
          case false:
            return 'false';
         default:
             return 'false';
     }
    }
    getBoolean(value) {
      switch (value) {
           case 'true':
               return true;
            case 'false':
              return false;
           default:
               return false;
        }
      }

    completed_innovation_id = new BehaviorSubject(false);

    set_innovation_id(id){
      this.completed_innovation_id.next(id);
    }
    get_innovation_id(){
      return this.completed_innovation_id.value;
    }

}
