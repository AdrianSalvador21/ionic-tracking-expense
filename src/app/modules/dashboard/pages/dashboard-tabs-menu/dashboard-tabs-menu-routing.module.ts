import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardTabsMenuPage } from './dashboard-tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsMenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: 'expense-policies',
        loadChildren: () => import('../expense-policies/expense-policies.module').then( m => m.ExpensePoliciesPageModule)
      },
      {
        path: 'report-details',
        loadChildren: () => import('../report-details/report-details.module').then( m => m.ReportDetailsPageModule)
      },
      {
        path: 'new-report',
        loadChildren: () => import('../new-report/new-report.module').then( m => m.NewReportPageModule)
      },
      {
        path: 'add-expense-policy',
        loadChildren: () => import('../add-expense-policy/add-expense-policy.module').then( m => m.AddExpensePolicyPageModule)
      },
      {
        path: 'new-expense',
        loadChildren: () => import('../new-expense/new-expense.module').then( m => m.NewExpensePageModule)
      },
      {
        path: 'expense-details',
        loadChildren: () => import('../expense-details/expense-details.module').then( m => m.ExpenseDetailsPageModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('../invoices/invoices.module').then( m => m.InvoicesPageModule)
      },
      {
        path: 'invoices/:id',
        loadChildren: () => import('../invoices/invoices.module').then( m => m.InvoicesPageModule)
      },
      {
        path: 'invoice-details',
        loadChildren: () => import('../invoice-details/invoice-details.module').then( m => m.InvoiceDetailsPageModule)
      },
      {
        path: 'new-report-slides',
        loadChildren: () => import('../new-report-slides/new-report-slides-routing.module').then( m => m.NewReportSlidesPageRoutingModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('../logout/logout.module').then( m => m.LogoutPageModule)
      },
      {
        path: '**',
        redirectTo: 'reports',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTabsMenuPageRoutingModule {}
