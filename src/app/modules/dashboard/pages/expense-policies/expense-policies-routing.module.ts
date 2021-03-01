import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensePoliciesPage } from './expense-policies.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensePoliciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensePoliciesPageRoutingModule {}
