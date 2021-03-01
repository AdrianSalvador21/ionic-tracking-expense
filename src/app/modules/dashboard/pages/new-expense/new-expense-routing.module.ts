import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExpensePage } from './new-expense.page';
import {PipesModule} from "../../../../core/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: NewExpensePage
  }
];

@NgModule({
  imports: [
    PipesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class NewExpensePageRoutingModule {}
