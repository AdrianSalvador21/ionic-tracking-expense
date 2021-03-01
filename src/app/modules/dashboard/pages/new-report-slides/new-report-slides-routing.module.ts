import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReportSlidesPage } from './new-report-slides.page';

const routes: Routes = [
  {
    path: '',
    component: NewReportSlidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReportSlidesPageRoutingModule {}
