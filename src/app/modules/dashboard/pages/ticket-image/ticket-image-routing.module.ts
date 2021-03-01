import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketImagePage } from './ticket-image.page';

const routes: Routes = [
  {
    path: '',
    component: TicketImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketImagePageRoutingModule {}
