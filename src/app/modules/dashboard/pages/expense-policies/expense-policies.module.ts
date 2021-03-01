import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensePoliciesPageRoutingModule } from './expense-policies-routing.module';

import { ExpensePoliciesPage } from './expense-policies.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpensePoliciesPageRoutingModule
  ],
  declarations: [ExpensePoliciesPage]
})
export class ExpensePoliciesPageModule {}
