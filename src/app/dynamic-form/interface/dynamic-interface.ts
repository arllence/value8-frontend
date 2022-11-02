export interface DynamicInterface {
}


export interface Validator {
    name: string;
    validator: any;
    message: string;
  }
  export interface FieldConfig {
    id?: string;
    label?: string;
    name?: string;
    width?:number;
    input_type?: string;
    options?:any[];
    collections?: any;
    field_type: string;
    value?: any;
    validations?: Validator[];
  }
  