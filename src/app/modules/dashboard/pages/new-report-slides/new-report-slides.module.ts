import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReportSlidesPageRoutingModule } from './new-report-slides-routing.module';

import { NewReportSlidesPage } from './new-report-slides.page';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReportSlidesPageRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [NewReportSlidesPage],
  exports: [
    NewReportSlidesPage
  ]
})
export class NewReportSlidesPageModule {}
