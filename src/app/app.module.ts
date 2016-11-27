import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTableModule } from 'angular2-datatable';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { routing } from './app.routing';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    DataFilterPipe,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
