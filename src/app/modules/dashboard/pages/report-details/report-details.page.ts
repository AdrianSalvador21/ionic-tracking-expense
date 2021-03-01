import { getActiveUser, IValidUser } from 'src/app/modules/security/valid-users';
import { loggedInUserLocalStorageKey } from './../../../security/valid-users';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LoadingController, ModalController, NavController } from "@ionic/angular";
import { ExpenseDetailsPage } from "../expense-details/expense-details.page";
import { HttpClient } from "@angular/common/http";
import { DownloadService } from "../../../../core/providers/download.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.reducer";
import { AppObservableService } from "../../../../core/providers/app-observable.service";
import { SetReportAction } from 'src/app/core/actions/reports.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../../../../../environments/environment";


export interface Filters {
  name: string;
}

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  public reportData;
  public reportValues = {};
  public loading;
  public expenses = [];
  public fullAmount = 0;
  public categories = [];
  public subExpenses = [];
  public expensesWithoutTicket: number = 0;
  public expensesWithoutInvoice: number = 0;
  public noFactura = 0;
  public noTicket = 0;
  public montoTotal = 0;
  constructor(public nav: NavController,
    private modalCtrl: ModalController,
    public http: HttpClient,
    public observableService: AppObservableService,
    private store: Store<AppState>,
    public loadingController: LoadingController,
    public downloadService: DownloadService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.store.select('reports').subscribe((state) => {
      if (!!state.reportData) {
        this.reportData = state.reportData;
        localStorage.setItem('reportData', JSON.stringify(state.reportData));
        this.getCategories().then(() => {
          this.getReportExpenses(this.reportData.id);
        });
      }

      if (!!this.reportData && this.reportData.reportInputFieldValues) {
        if (!this.reportData.adelanto) {
          this.reportData.adelanto = 0;
        }
        this.reportData.reportInputFieldValues.forEach((inputField) => {
          this.reportValues[inputField.reportCustomField.name] = inputField.value;
        });
      }

    });



    console.warn(this.reportData);
  }

  ionViewWillEnter() {
    this.getCategories().then(() => {
      this.getReportExpenses(this.reportData.id);
    });
  }

  showCategoryDetail = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filters: Filters[] = [
    { name: 'Fecha' },
    { name: 'Categoría' }
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.filters.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(filter: Filters): void {
    const index = this.filters.indexOf(filter);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  showDetail(detail: boolean, categoryId?) {
    this.showCategoryDetail = detail;

    if (!!categoryId) {
      this.subExpenses = this.expenses.filter(expense => expense.idExpenseCategory === categoryId);
    } else {
      this.subExpenses = [];
    }
  }

  updateReportExpenseinfo() {
    this.noFactura = 0;
    this.noTicket = 0;
    this.montoTotal = 0;
    let auxTotal = 0;
    this.expenses.map((expense) => {
      if (expense.idFactura == 0) {
        this.noFactura++;
      }
      if (!expense.ticket) {
        this.noTicket++;
      }
      this.montoTotal = parseFloat(expense.expenseValues.Monto) + parseFloat(auxTotal as unknown as string);
      auxTotal = this.montoTotal;
    })
  }

  newExpense() {
    let report = this.reportData;
    report.editingExpense = null;
    report.isNewExpense = true;
    const action = new SetReportAction(report);
    this.store.dispatch(action);
    this.nav.navigateForward('/dashboard-tabs-menu/new-expense');
  }

  async goToExpenseDetail(expense) {
    // this.nav.navigateForward('/dashboard-tabs-menu/expense-details');
    const modal = await this.modalCtrl.create({
      component: ExpenseDetailsPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica',
        expenseData: expense
      }
    });

    await modal.present();
  }

  async requestApproval() {
    const url = `api/Reports/${this.reportData.id}/ReportStatus`;
    this.reportData.adelanto = null;
    this.reportData.reportStatus = 'InReview';
    this.reportData.anticipo = 0;
    await this.observableService.patchService(true, url, this.reportData, {
      "idCreatedBy": getActiveUser().idUser.toString()
    }).subscribe((data) => {
      this._snackBar.open('Reporte mandado a revisión', 'Aceptar', {
        duration: 3000
      });
      console.warn('report updated', data);
      this.nav.navigateBack('/dashboard-tabs-menu/reports');
    });
  }

  async getReportExpenses(id) {

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    const url = `/api/Reports/${id}/Expenses`;

    this.observableService.getService(true, url, this.loading).subscribe((data) => {
      this.expenses = data.data;
      for (let i = 0; i < this.expenses.length; i++) {
        this.expenses[i]['expenseValues'] = {};
        for (let j = 0; j < this.expenses[i].inputFieldValues.length; j++) {
          this.expenses[i]['expenseValues'][this.expenses[i].inputFieldValues[j].inputField.name] = this.expenses[i].inputFieldValues[j].value;
        }
      }
      if (this.expenses.length > 0) {
        this.expenses.forEach((expense) => {
          expense['categoryName'] = this.setCategoryName(expense.idExpenseCategory);
          if (!!expense.expenseValues['Monto']) {
            this.fullAmount = this.fullAmount + Number(expense.expenseValues['Monto']);
          }
        });
      } else {
        this.fullAmount = 0;
      }

      console.warn('All expensnes', this.expenses);

      //Count the expenses without invoice and ticker
      this.updateReportExpenseinfo();
      this.dismisAllLoadings();
    });
  }

  setCategoryName(id) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        return this.categories[i].name;
      }
    }
  }

  downloadPdf() {
    this._snackBar.open('Descargando PDF', 'Aceptar', {
      duration: 3000
    });
    this.downloadService.downloadPdf(this.expenses);
  }

  downloadExcel() {

    this._snackBar.open('Descargando Excel', 'Aceptar', {
      duration: 3000
    });

    this.downloadService.downloadExcel();
  }

  async getCategories() {
    const url = '/api/ExpenseCategories';
    this.observableService.getService(true, url).subscribe((data) => {
      this.categories = data.data;
    });
  }

  getCategoryAmount(id) {
    let amount = 0;

    for (let i = 0; i < this.expenses.length; i++) {
      if (id === this.expenses[i].idExpenseCategory) {
        amount = amount + Number(this.expenses[i].expenseValues['Monto']);
      }
    }

    return amount;
  }

  dismisAllLoadings() {
    var element = document.getElementsByTagName("ion-loading"), index;

    for (index = element.length - 1; index >= 0; index--) {
      element[index].parentNode.removeChild(element[index]);
    }
  }
}
