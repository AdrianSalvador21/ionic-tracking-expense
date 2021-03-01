import * as fromReports from '../actions/reports.actions';

export interface ReportsState {
  reportData: any;
  reportBasicData: any;
  approvers: any;
  invoiceData: any;
}

const initialStatus: ReportsState = {
  reportData: {},
  reportBasicData: {
    title: '',
    approver: ''
  },
  approvers: [],
  invoiceData: null
};

export function reportReducer( state = initialStatus, action: fromReports.actions ): any {
  switch ( action.type ) {
    case fromReports.SET_REPORT:
      return {
        ...state,
        reportData: {...state.reportData, ...action.reportData}
      };

    case fromReports.SET_BASIC_REPORT:
      return  {
        ...state,
        reportBasicData: {...state.reportBasicData, ...action.reportBasicData}
      };

    case fromReports.SET_APPROVERS:
      return  {
        ...state,
        approvers: [...action.approversData]
      };

    case fromReports.SET_INVOICE:
      return  {
        ...state,
        invoiceData: action.invoiceData
      };

    default:
      return state;
  }
}
