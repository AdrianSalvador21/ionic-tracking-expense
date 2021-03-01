import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewReportPageRoutingModule } from './new-report-routing.module';
import { NewReportPage } from './new-report.page';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatNativeDateModule} from "@angular/material/core";
import {FormGeneratorService} from "../../../../core/providers/form-generator.service"
import {File} from "@ionic-native/file/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import { Base64 } from '@ionic-native/base64/ngx';
import { Device } from '@ionic-native/device/ngx';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatSelectModule,
    NewReportPageRoutingModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    SharedModule
  ],
  declarations: [NewReportPage],
  providers: [FormGeneratorService, File, FileOpener, FileChooser, FilePath, Base64, Device]
})
export class NewReportPageModule {}
