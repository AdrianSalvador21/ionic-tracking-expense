import { Component, OnInit } from '@angular/core';
import { Filters } from "../report-details/report-details.page";
import { AlertController, LoadingController, ModalController, NavController } from "@ionic/angular";
import { InvoiceDetailsPage } from "../invoice-details/invoice-details.page";
import { ActivatedRoute } from "@angular/router";
import { AppObservableService } from "../../../../core/providers/app-observable.service";
import { SetReportAction, SetSelectedInvoiceAction } from "../../../../core/actions/reports.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.reducer";
import { IValidUser, loggedInUserLocalStorageKey, getActiveUser } from 'src/app/modules/security/valid-users';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
  showCategoryDetail = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  expenseFormatId;
  loading;

  filters: Filters[] = [
    { name: 'Fecha' },
    { name: 'Categoría' }
  ];

  public invoices = [];

  constructor(public nav: NavController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public observableService: AppObservableService,
    private alertCtrl: AlertController,
    private store: Store<AppState>,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getInvoices();
    this.activatedRoute.paramMap.subscribe((data) => {
      if (!!data['params'].id) {
        this.expenseFormatId = data['params'].id;
        console.log(this.expenseFormatId);
      }
    });
  }

  async getInvoices() {
    this.invoices = [];
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const url = `api/Facturas/user/${getActiveUser().idUser}`;
    this.observableService.getService(true, url).subscribe((data) => {
      console.log('invoice data', data);
      data.data.forEach((invoice) => {
        invoice.fechaTimbrado = new Date(invoice.fechaTimbrado);
        this.invoices.push(invoice);
        console.log(this.invoices);
      });
      this.loading.dismiss();
    });
  }

  remove(filter: Filters): void {
    const index = this.filters.indexOf(filter);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  doRefresh(event) {
    this.getInvoices();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async goToInvoiceDetail(invoice: any) {
    //this.nav.navigateForward('/dashboard-tabs-menu/invoice-details');

    if (!!this.expenseFormatId) {
      const alert = await this.alertCtrl.create({
        header: 'Factura',
        message: '¿Desea agregar esta factura?',
        buttons: [
          {
            text: 'Agregar',
            handler: () => {
              console.log('click en ok!');
              const action = new SetSelectedInvoiceAction(invoice);
              this.store.dispatch(action);
              this.nav.navigateBack('/dashboard-tabs-menu/new-expense');
              console.log('invoice data', invoice);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'rojo'
          }
        ]
      });
      await alert.present();

    } else {
      console.log(invoice);
      const modal = await this.modalCtrl.create({
        component: InvoiceDetailsPage,
        componentProps: {
          nombre: 'Fernando',
          pais: 'Costa Rica',
          data: invoice
        }
      });

      await modal.present();
    }
  }
}
