import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

@Component({
  selector: 'app-invoice-image',
  templateUrl: './invoice-image.page.html',
  styleUrls: ['./invoice-image.page.scss'],
})
export class InvoiceImagePage implements OnInit {

  @Input() invoiceData: any;

  constructor(public modal: ModalController, private previewAnyFile: PreviewAnyFile) { }

  ngOnInit() {
    console.warn(this.invoiceData);
  }

  previewInvoice(){
    this.previewAnyFile.preview(this.invoiceData.archivoPdf.url).then((res: any) => console.log(res)).catch((error: any) => console.error(error));
  }

  closeModal() {
    this.modal.dismiss();
  }

}
