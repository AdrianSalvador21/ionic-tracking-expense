import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExpensePageRoutingModule } from './new-expense-routing.module';

import { NewExpensePage } from './new-expense.page';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PipesModule} from "../../../../core/pipes/pipes.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {SharedModule} from "../../../shared/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FormGeneratorService} from "../../../../core/providers/form-generator.service";
import {File} from "@ionic-native/file/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import {Device} from "@ionic-native/device/ngx";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExpensePageRoutingModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    PipesModule,
    CurrencyMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  declarations: [NewExpensePage],
  providers: [FileChooser, FormGeneratorService, File, FileOpener, FilePath, Base64, Device]
})
export class NewExpensePageModule {}
