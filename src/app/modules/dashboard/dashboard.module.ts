import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {CategoriesTableComponent} from "./components/categories-table/categories-table.component";
import {UsersAssignmentComponent} from "./components/users-assignment/users-assignment.component";
import {ExpenseDetailCardsComponent} from "./components/expense-detail-cards/expense-detail-cards.component";
import {ExpenseMessagesComponent} from "./components/expense-messages/expense-messages.component";
import {MatIconModule} from "@angular/material/icon";
import {ExpenseHistoryComponent} from "./components/expense-history/expense-history.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoriesTableComponent,
    UsersAssignmentComponent,
    ExpenseDetailCardsComponent,
    ExpenseMessagesComponent,
    ExpenseHistoryComponent,
  ],
  exports: [
    CategoriesTableComponent,
    UsersAssignmentComponent,
    ExpenseDetailCardsComponent,
    ExpenseMessagesComponent,
    ExpenseHistoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule,
    SharedModule
  ]
})
export class DashboardModule { }
