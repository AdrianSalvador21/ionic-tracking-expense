import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReportSliderPage } from './new-report-slider.page';

const routes: Routes = [
  {
    path: '',
    component: NewReportSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReportSliderPageRoutingModule {}
