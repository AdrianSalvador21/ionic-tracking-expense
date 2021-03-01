import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-ticket-image',
  templateUrl: './ticket-image.page.html',
  styleUrls: ['./ticket-image.page.scss'],
})
export class TicketImagePage implements OnInit {
  @Input() expenseData: any;
  public image = '/assets/images/dashboard/ticket-example.png';

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.dismiss();
  }
}
