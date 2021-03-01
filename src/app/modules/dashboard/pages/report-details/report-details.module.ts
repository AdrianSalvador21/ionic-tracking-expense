import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDetailsPageRoutingModule } from './report-details-routing.module';

import { ReportDetailsPage } from './report-details.page';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DownloadService} from "../../../../core/providers/download.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportDetailsPageRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  declarations: [ReportDetailsPage],
  providers: [DownloadService]
})
export class ReportDetailsPageModule {}
