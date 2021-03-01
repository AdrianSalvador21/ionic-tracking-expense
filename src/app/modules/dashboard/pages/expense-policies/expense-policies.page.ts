import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-expense-policies',
  templateUrl: './expense-policies.page.html',
  styleUrls: ['./expense-policies.page.scss'],
})
export class ExpensePoliciesPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  newExpensePolicy() {
    this.nav.navigateForward('/dashboard-menu/add-expense-policy');
  }

}
