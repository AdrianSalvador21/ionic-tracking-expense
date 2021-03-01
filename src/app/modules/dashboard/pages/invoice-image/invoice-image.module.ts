import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceImagePageRoutingModule } from './invoice-image-routing.module';

import { InvoiceImagePage } from './invoice-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceImagePageRoutingModule
  ],
  declarations: [InvoiceImagePage],
  exports: [InvoiceImagePage]
})
export class InvoiceImagePageModule {}
