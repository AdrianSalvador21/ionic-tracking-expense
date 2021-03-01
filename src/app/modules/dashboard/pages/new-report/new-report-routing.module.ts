import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReportPage } from './new-report.page';
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from "ng2-currency-mask";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: '.',
  precision: 0,
  prefix: '$',
  suffix: '',
  thousands: ',',
};

const routes: Routes = [
  {
    path: '',
    component: NewReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CurrencyMaskModule],
  exports: [RouterModule],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
  ]
})
export class NewReportPageRoutingModule {}
