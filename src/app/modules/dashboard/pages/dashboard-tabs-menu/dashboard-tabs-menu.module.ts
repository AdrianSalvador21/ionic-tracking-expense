import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardTabsMenuPageRoutingModule } from './dashboard-tabs-menu-routing.module';

import { DashboardTabsMenuPage } from './dashboard-tabs-menu.page';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardTabsMenuPageRoutingModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  declarations: [DashboardTabsMenuPage]
})
export class DashboardTabsMenuPageModule {}
