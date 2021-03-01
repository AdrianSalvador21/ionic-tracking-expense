import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatStepperModule } from '@angular/material/stepper';
import { AddExpensePolicyPageRoutingModule } from './add-expense-policy-routing.module';

import { AddExpensePolicyPage } from './add-expense-policy.page';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DashboardModule} from "../../dashboard.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    DashboardModule,
    AddExpensePolicyPageRoutingModule
  ],
  declarations: [AddExpensePolicyPage]
})
export class AddExpensePolicyPageModule {}
