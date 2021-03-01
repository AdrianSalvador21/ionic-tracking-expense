import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardMenuPageRoutingModule } from './dashboard-menu-routing.module';

import { DashboardMenuPage } from './dashboard-menu.page';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    DashboardMenuPageRoutingModule
  ],
  declarations: [DashboardMenuPage]
})
export class DashboardMenuPageModule {}
