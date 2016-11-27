import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {


  public data: User[] = [
    {
      firstName: "John",
      lastName: "Frederick",
      email: "email@email.com",
      gender: "male",
      role: "USER"
    },
    {
      firstName: "Luke",
      lastName: "Skywalker",
      email: "skywalker@starwars.com",
      gender: "male",
      role: "ADMIN"
    },
    {
      firstName: "Lora",
      lastName: "Palmer",
      email: "lora@twinpeaks.com",
      gender: "female",
      role: "USER"
    },
    {
      firstName: "Oleg",
      lastName: "Lyashko",
      email: "lyashko@vsixnavyla.com",
      gender: "male",
      role: "USER"
    },
    {
      firstName: "Douglas",
      lastName: "Crockford",
      email: "douglas@crockford.com",
      gender: "male",
      role: "ROOT"
    }
  ];

  public filterQuery = "";
  public sortBy = "firstName";
  public sortOrder = "asc";
  private deleting: number;
  private editing: number;
  private creating: boolean;
  private rowEdit: FormGroup;
  private item: User;
  public genders: string[] = ['male', 'female'];
  public roles: string[] = ['ADMIN', 'ROOT', 'USER'];

  public mustBeUniqueValidator: Function = function(control: FormControl): {[s: string]: boolean} {
    let filteredData = this.data.filter(index => {
      return control.value.toLowerCase().match(index.email.toLowerCase());
      }
    );
    if (filteredData.length === 0) {
      return null;
    } else if (filteredData[0].email === this.item.email) {
      return null;
    } else {
      return {example: true};
    }
  }.bind(this);

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
      firstName:   [`${this.data[this.data.indexOf(item)].firstName}`, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName:    [`${this.data[this.data.indexOf(item)].lastName}`, [Validators.maxLength(15)]],
      email:       [`${this.data[this.data.indexOf(item)].email}`, [
        Validators.required,
        Validators.pattern("[A-Za-z0-9-_\.]{1,255}@[A-Za-z0-9-_\.]{1,255}\\.{1,1}[A-Za-z]{2,6}"),
        this.mustBeUniqueValidator
      ]],
      gender:      [`${this.data[this.data.indexOf(item)].gender}`],
      role:        [`${this.data[this.data.indexOf(item)].role}`]
    });
  }

  onSubmit(item) {
    let row = this.data[this.data.indexOf(item)];
    row.firstName = this.rowEdit.controls['firstName'].value;
    row.lastName = this.rowEdit.controls['lastName'].value;
    row.email = this.rowEdit.controls['email'].value;
    row.gender = this.rowEdit.controls['gender'].value;
    row.role = this.rowEdit.controls['role'].value;
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
      firstName:   [``, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName:    [``, [Validators.maxLength(15)]],
      email:       [``, [
        Validators.required,
        Validators.pattern("[A-Za-z0-9-_\.]{1,255}@[A-Za-z0-9-_\.]{1,255}\\.{1,1}[A-Za-z]{2,6}"),
        this.mustBeUniqueValidator
      ]],
      gender:      [``, [Validators.required]],
      role:        [``, [Validators.required]]
    });
    this.item = new User(null,null,null,null,null);
  }

  onSubmitCreation() {
    Object.keys(this.rowEdit.controls).forEach(key => {
      this.item[key] = this.rowEdit.controls[key].value;
    });
    this.data.push(JSON.parse(JSON.stringify(this.item)));
    this.creating = false;
    this.item = null;
  }

}
