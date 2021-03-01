import { AppAuthGuardService } from './core/providers/app-auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  /* {
    path: 'dashboard-menu',
    loadChildren: () => import('./modules/dashboard/pages/dashboard-menu/dashboard-menu.module').then( m => m.DashboardMenuPageModule)
  },
   */
  {
    path: 'login',
    loadChildren: () => import('./modules/security/pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/security/pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'new-expense',
    loadChildren: () => import('./modules/dashboard/pages/new-expense/new-expense.module').then(m => m.NewExpensePageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'expense-details',
    loadChildren: () => import('./modules/dashboard/pages/expense-details/expense-details.module').then(m => m.ExpenseDetailsPageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./modules/dashboard/pages/invoices/invoices.module').then(m => m.InvoicesPageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'invoice-details',
    loadChildren: () => import('./modules/dashboard/pages/invoice-details/invoice-details.module').then(m => m.InvoiceDetailsPageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'dashboard-tabs-menu',
    loadChildren: () => import('./modules/dashboard/pages/dashboard-tabs-menu/dashboard-tabs-menu.module').then(m => m.DashboardTabsMenuPageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'invoice-image',
    loadChildren: () => import('./modules/dashboard/pages/invoice-image/invoice-image.module').then(m => m.InvoiceImagePageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'ticket-image',
    loadChildren: () => import('./modules/dashboard/pages/ticket-image/ticket-image.module').then(m => m.TicketImagePageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'new-report-slider',
    loadChildren: () => import('./modules/dashboard/pages/new-report-slider/new-report-slider.module').then(m => m.NewReportSliderPageModule),
    canActivate: [AppAuthGuardService]
  },
  {
    path: 'new-report-slides',
    loadChildren: () => import('./modules/dashboard/pages/new-report-slides/new-report-slides.module').then(m => m.NewReportSlidesPageModule),
    canActivate: [AppAuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
