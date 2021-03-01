import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReportSliderPageRoutingModule } from './new-report-slider-routing.module';

import { NewReportSliderPage } from './new-report-slider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReportSliderPageRoutingModule
  ],
  declarations: [NewReportSliderPage]
})
export class NewReportSliderPageModule {}
