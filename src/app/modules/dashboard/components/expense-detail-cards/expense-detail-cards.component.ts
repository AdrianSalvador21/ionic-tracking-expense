import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {InvoiceImagePage} from "../../pages/invoice-image/invoice-image.page";
import {TicketImagePage} from "../../pages/ticket-image/ticket-image.page";
import {AppObservableService} from "../../../../core/providers/app-observable.service";

@Component({
  selector: 'app-expense-detail-cards',
  templateUrl: './expense-detail-cards.component.html',
  styleUrls: ['./expense-detail-cards.component.scss'],
})
export class ExpenseDetailCardsComponent implements OnInit {
  @Input() expenseData: any;
  public loading;
  public invoiceData;

  constructor(public modalCtrl: ModalController,
              public loadingController: LoadingController,
              public observableService: AppObservableService,) { }

  ngOnInit() {
    this.getInvoiceData();
  }

  async goToInvoice() {
    const modal = await this.modalCtrl.create({
      component: InvoiceImagePage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica',
        invoiceData: this.invoiceData
      }
    });

    await modal.present();
  }

  async goToTicket() {
    const modal = await this.modalCtrl.create({
      component: TicketImagePage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica',
        expenseData: this.expenseData
      }
    });

    await modal.present();
  }

  async getInvoiceData() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();

    if (this.expenseData.idFactura === 0) {
      this.loading.dismiss();
      return;
    }

    const url = `/api/Facturas/${this.expenseData.idFactura}`;
    this.observableService.getService(true, url).subscribe((data) => {
      this.invoiceData = data;
      this.loading.dismiss();
    });
  }

}
