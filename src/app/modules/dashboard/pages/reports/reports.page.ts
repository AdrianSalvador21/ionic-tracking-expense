import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from "@ionic/angular";

import {
  Plugins,
  StatusBarStyle,
  FilesystemDirectory,
  Capacitor
} from '@capacitor/core';
import { NewReportSlidesPage } from "../new-report-slides/new-report-slides.page";

const { StatusBar, Filesystem } = Plugins;

import { FileOpener } from "@ionic-native/file-opener/ngx";
import { HttpClient } from "@angular/common/http";
import { FirebaseAnalyticsService } from "../../../../core/providers/firebase-analytics.service";
import { AppObservableService } from "../../../../core/providers/app-observable.service";
import { SetReportAction } from "../../../../core/actions/reports.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.reducer";

if (Capacitor.isPluginAvailable('StatusBar')) { StatusBar.show() };

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  enabled = this.analyticsService.analyticsEnabled;
  loading;
  public reports = [];
  constructor(public nav: NavController,
    public http: HttpClient,
    public analyticsService: FirebaseAnalyticsService,
    private store: Store<AppState>,
    public observableService: AppObservableService,
    public fileOpener: FileOpener,
    public loadingController: LoadingController,
    public modalCtrl: ModalController) {


    // StatusBar.setStyle({
    //   style: StatusBarStyle.Light
    // });

    // StatusBar.setBackgroundColor({
    //   color: '#f0f1f8'
    // });
  }

  ngOnInit() {
    //this.getReports();
  }

  ionViewWillEnter() {
    this.getReports();
  }

  async getReports() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const url = '/api/Reports/';
    this.observableService.getService(true, url).subscribe((data) => {

      console.warn('Reports Obtained', data.data);
      this.reports = data.data;
      for (let i = 0; i < this.reports.length; i++) {
        this.reports[i]['reportValues'] = {};
        for (let j = 0; j < this.reports[i].reportInputFieldValues.length; j++) {
          this.reports[i]['reportValues'][this.reports[i].reportInputFieldValues[j].reportCustomField.name] = this.reports[i].reportInputFieldValues[j].value;
        }
      }

      this.loading.dismiss();

      // this.reports = [];
    });
  }

  doRefresh(event) {
    this.getReports();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  setStatusClass(status) {
    switch (status) {
      case 'Approved':
        return {
          'primary': true
        }
        break;
      case 'Rejected':
        return {
          'rejected': true
        }
        break;
      case 'InProgress':
        return {
          'inProgress': true
        }
        break;
      case 'InReview':
        return {
          'inReview': true
        }
        break;
      default:
        return {
          'primary': true
        };
    }
  }

  newReport() {
    this.nav.navigateForward('/dashboard-tabs-menu/new-report');
  }

  async newReport2() {
    // this.nav.navigateForward('/dashboard-tabs-menu/new-report');
    const modal = await this.modalCtrl.create({
      component: NewReportSlidesPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica'
      }
    });

    await modal.present();
  }

  reportDetail(report) {
    const action = new SetReportAction(report);
    this.store.dispatch(action);
    this.nav.navigateForward('/dashboard-tabs-menu/report-details');
  }

  setUser() {
    this.analyticsService.setUser();
  }

  setProperty() {
    this.analyticsService.setProperty();
  }

  logEvent() {
    this.analyticsService.logEvent();
  }


  toggleDataCollection() {
    this.analyticsService.toggleAnalytics();
    this.enabled = this.analyticsService.analyticsEnabled;
  }

  setStatusLabel(status) {
    switch (status) {
      case 'Approved':
        return 'Aprobado';
        break;
      case 'Rejected':
        return 'Rechazado';
        break;
      case 'InProgress':
        return 'En progreso';
        break;
      case 'InReview':
        return 'En revisión';
        break;
      case 'Facturado':
        return 'Facturado';
        break;
      default:
        return '';
    }
  }
}
