import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketImagePageRoutingModule } from './ticket-image-routing.module';

import { TicketImagePage } from './ticket-image.page';
import {PipesModule} from "../../../../core/pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketImagePageRoutingModule,
    PipesModule
  ],
  declarations: [TicketImagePage],
  exports: [TicketImagePage]
})
export class TicketImagePageModule {}
