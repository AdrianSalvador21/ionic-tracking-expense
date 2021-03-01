import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './core/reducers/auth.reducer.js';
import * as fromReports from './core/reducers/reports.reducer.js';

export interface AppState {
  auth: fromAuth.AuthState;
  reports: fromReports.ReportsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.userReducer,
  reports: fromReports.reportReducer
};
