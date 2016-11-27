import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Company } from './company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent {

  public data: Company[] = [
    {
      name: 'Coca Cola',
      address: '508, 54th Ave, Los Angeles, CA',
      phoneNumber: 1234567,
      site: 'http://www.cocacola.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Amazon Inc',
      address: 'Seattle, Washington, U.S',
      phoneNumber: 55588840,
      site: 'http://www.amazon.com',
      description: 'American electronic commerce and cloud computing company, founded in July 5, 1994 by Jeff Bezos and based in Seattle, Washington.'
    },
    {
      name: 'Sony Corporation',
      address: 'Minato, Tokyo, Japan',
      phoneNumber: 98704056,
      site: 'http://www.sony.com',
      description: 'The company is one of the leading manufacturers of electronic products for the consumer and professional markets.'
    },
    {
      name: 'Pepsi Corporation',
      address: 'US, Manhattan str, 50',
      phoneNumber: 123456789,
      site: 'http://www.pepsi.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'IBM',
      address: '255.255.255.0',
      phoneNumber: 989858985094,
      site: 'http://www.ibm.com',
      description: 'American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.'
    }
  ];
  public filterQuery = "";
  public sortBy = "name";
  public sortOrder = "asc";
  private deleting: number;
  private editing: number;
  private creating: boolean;
  private rowEdit: FormGroup;
  private item: Company;

  constructor(private formBuilder: FormBuilder) {
  }

  disabled() {
    if(this.deleting === 0 || this.editing === 0) {
      return true;
    }
    return this.deleting || this.editing || this.creating;
  }

  onX(i, item) {
    this.item = item;
    this.deleting = i;
  }

  onCancelDelete() {
    this.deleting = null;
    this.item = null;
  }

  onRemove(item) {
    this.data.splice(this.data.indexOf(item), 1);
    this.deleting = null;
    this.item = null;
  }

  onEdit(i, item) {
    this.item = item;
    this.editing = i;
    this.rowEdit = this.formBuilder.group({
      name:         [`${this.data[this.data.indexOf(item)].name}`, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      address:      [`${this.data[this.data.indexOf(item)].address}`, [Validators.maxLength(40)]],
      phoneNumber:  [`${this.data[this.data.indexOf(item)].phoneNumber}`, [Validators.minLength(7), Validators.maxLength(17), this.mustBeNumberValidator]],
      site:         [`${this.data[this.data.indexOf(item)].site}`, Validators.pattern("https?:\/\/www\\.[a-zA-Z0-9-_\.\/]+\\.[a-zA-Z\/]{2,6}")],
      description:  [`${this.data[this.data.indexOf(item)].description}`]
    })
  }

  onSubmit(item) {
    let row = this.data[this.data.indexOf(item)];
    row.name = this.rowEdit.controls['name'].value;
    row.address = this.rowEdit.controls['address'].value;
    row.phoneNumber = +this.rowEdit.controls['phoneNumber'].value;
    row.site = this.rowEdit.controls['site'].value;
    row.description = this.rowEdit.controls['description'].value;
    this.editing = null;
    this.item = null;
  }

  onCancel() {
    this.editing = null;
    this.creating = false;
    this.item = null;
  }

  onCreate() {
    this.creating = true;
    this.rowEdit = this.formBuilder.group({
      name:         ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      address:      ['', [Validators.maxLength(40)]],
      phoneNumber:  ['', [Validators.minLength(7), Validators.maxLength(17), this.mustBeNumberValidator]],
      site:         ['', Validators.pattern("https?:\/\/www\\.[a-zA-Z0-9-_\.\/]+\\.[a-zA-Z\/]{2,6}")],
      description:  ['']
    });
    this.item = new Company(null,null,null,null,null);
  }

  onSubmitCreation() {
    Object.keys(this.rowEdit.controls).forEach(key => {
      this.item[key] = this.rowEdit.controls[key].value;
    });
    this.data.push(JSON.parse(JSON.stringify(this.item)));
    this.creating = false;
    this.item = null;
  }

  mustBeNumberValidator(control: FormControl): {[s: string]: boolean} {
    if (isNaN(+control.value)) {
      return {example: true};
    }
    return null;
  }

}
