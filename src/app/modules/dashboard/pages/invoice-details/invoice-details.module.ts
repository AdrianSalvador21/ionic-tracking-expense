import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceDetailsPageRoutingModule } from './invoice-details-routing.module';

import { InvoiceDetailsPage } from './invoice-details.page';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceDetailsPageRoutingModule,
    MatIconModule
  ],
  declarations: [InvoiceDetailsPage],
  exports:[InvoiceDetailsPage]
})
export class InvoiceDetailsPageModule {}
