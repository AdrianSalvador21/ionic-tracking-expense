import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from "@ionic/angular";
import { SetReportAction } from 'src/app/core/actions/reports.actions';
import { Store } from "@ngrx/store";
import { AppState } from '@capacitor/core';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {

  @Input() expenseData: any;

  constructor(private modalCtrl: ModalController, public nav: NavController, private store: Store<AppState>,) { }
  reportData = {};
  ngOnInit() {
    this.store.select<any>('reports').subscribe((state) => {
      if (!!state.reportData) {
        this.reportData = state.reportData;
        console.log(this.reportData);
      }
    });
    console.log('EXPENSE DATA', this.expenseData);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  goToEditExpense() {
    this.modalCtrl.dismiss();
    this.reportData['editingExpense'] = this.expenseData;
    const action = new SetReportAction(this.reportData);
    this.store.dispatch(action);
    this.nav.navigateForward('/dashboard-tabs-menu/new-expense');
  }
}
