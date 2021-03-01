import { Action } from '@ngrx/store';

export const SET_REPORT = '[Report] Set report';
export const SET_BASIC_REPORT = '[Report] Set basic report';
export const SET_APPROVERS = '[Report] Set approvers';
export const SET_INVOICE = '[Report] Set invoice';


export class SetReportAction implements Action {
  readonly type = SET_REPORT;
  constructor( public reportData: any ) {}
}

export class SetBasicReportAction implements Action {
  readonly type = SET_BASIC_REPORT;
  constructor( public reportBasicData: any ) {}
}

export class SetApproversAction implements Action {
  readonly type = SET_APPROVERS;
  constructor( public approversData: any ) {}
}

export class SetSelectedInvoiceAction implements Action {
  readonly type = SET_INVOICE;
  constructor( public invoiceData: any ) {}
}


export type actions = SetReportAction | SetBasicReportAction | SetApproversAction | SetSelectedInvoiceAction;
