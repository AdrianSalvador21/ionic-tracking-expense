import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import {SharedModule} from "../../../shared/shared.module";
import {FirebaseAnalyticsService} from "../../../../core/providers/firebase-analytics.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ReportsPageRoutingModule
  ],
  declarations: [ReportsPage],
  providers: [FirebaseAnalyticsService]
})
export class ReportsPageModule {}
