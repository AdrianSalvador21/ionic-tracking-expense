import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceImagePage } from './invoice-image.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceImagePageRoutingModule {}
