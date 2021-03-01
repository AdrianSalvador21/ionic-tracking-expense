import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FirebaseAnalyticsService} from "./core/providers/firebase-analytics.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  enabled = this.analyticsService.analyticsEnabled;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public analyticsService: FirebaseAnalyticsService
  ) {
    this.setGA();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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

  gaID(): string {
    return 'G-BTRXRWDNKY';
  }

  setGA(): void {
    const scriptGA = document.createElement('script');
    scriptGA.async = true;
    scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaID()}`;
    const contentGA2 = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${this.gaID()}');
    `;

    const scriptGA2 = document.createElement('script');
    scriptGA2.type = 'text/javascript';
    scriptGA2.text = contentGA2;
    document.head.append(scriptGA);
    document.head.append(scriptGA2);
  }
}
