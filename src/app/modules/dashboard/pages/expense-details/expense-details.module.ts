import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseDetailsPageRoutingModule } from './expense-details-routing.module';

import { ExpenseDetailsPage } from './expense-details.page';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {DashboardModule} from "../../dashboard.module";
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseDetailsPageRoutingModule,
    MatIconModule,
    MatTabsModule,
    DashboardModule,
    SharedModule,
    MatMenuModule
  ],
  declarations: [ExpenseDetailsPage],
  exports: [
    ExpenseDetailsPage
  ]
})
export class ExpenseDetailsPageModule {}
