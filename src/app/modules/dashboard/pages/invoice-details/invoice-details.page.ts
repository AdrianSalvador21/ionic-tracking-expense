import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.page.html',
  styleUrls: ['./invoice-details.page.scss'],
})
export class InvoiceDetailsPage implements OnInit {
  @Input() data: any;

  constructor(public modal: ModalController) {
  }

  ngOnInit() {
    console.log(this.data);
  }

  closeModal() {
    this.modal.dismiss();
  }
}
