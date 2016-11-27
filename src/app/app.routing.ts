import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';

const APP_ROUTES: Routes = [
  {path: "", redirectTo: 'companies', pathMatch: 'full'},
  {path: "companies", component: CompaniesComponent},
  {path: "users", component: UsersComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
