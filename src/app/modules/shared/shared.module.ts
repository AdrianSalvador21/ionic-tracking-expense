import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {DashboardHeaderComponent} from './components/dashboard-header/dashboard-header.component';
import {AmountInputComponent} from "./components/dynamic-form-generator/amount-input/amount-input.component";
import {ButtonComponent} from "./components/dynamic-form-generator/button/button.component";
import {FileComponent} from "./components/dynamic-form-generator/file/file.component";
import {CheckboxComponent} from "./components/dynamic-form-generator/checkbox/checkbox.component";
import {DateComponent} from "./components/dynamic-form-generator/date/date.component";
import {DynamicFieldDirective} from "./components/dynamic-form-generator/dynamic-field/dynamic-field.directive";
import {DynamicFormComponent} from "./components/dynamic-form-generator/dynamic-form/dynamic-form.component";
import {RadiobuttonComponent} from "./components/dynamic-form-generator/radiobutton/radiobutton.component";
import {SelectComponent} from "./components/dynamic-form-generator/select/select.component";
import {InputComponent} from "./components/dynamic-form-generator/input/input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    AmountInputComponent,
    ButtonComponent,
    FileComponent,
    CheckboxComponent,
    DateComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    RadiobuttonComponent,
    SelectComponent,
    InputComponent
  ],
  exports: [
    DashboardHeaderComponent,
    AmountInputComponent,
    ButtonComponent,
    FileComponent,
    CheckboxComponent,
    DateComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    RadiobuttonComponent,
    SelectComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [
    FileChooser
  ]
})
export class SharedModule { }
