import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpensePolicyPage } from './add-expense-policy.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensePolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpensePolicyPageRoutingModule {}
