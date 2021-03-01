import { AppAuthGuardService } from './core/providers/app-auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

import { FileOpener } from "@ionic-native/file-opener/ngx";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from "./app.reducer";
import { environment } from "../environments/environment";
import { FirebaseAnalyticsService } from "./core/providers/firebase-analytics.service";
import { AppObservableService } from "./core/providers/app-observable.service";
import { FormGeneratorService } from "./core/providers/form-generator.service";
import { File } from "@ionic-native/file/ngx";
import { Device } from '@ionic-native/device/ngx';
import { Base64 } from "@ionic-native/base64/ngx";
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { SharedModule } from './modules/shared/shared.module';
import { FileTransfer } from '@ionic-native/file-transfer/ngx'; // Tutorial called for /ngx but that failed
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: '.',
  precision: 0,
  prefix: '$',
  suffix: '',
  thousands: ',',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 30, // Retains last 30 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    CurrencyMaskModule,
    SharedModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
    FileOpener,
    AngularFirestoreModule,
    FirebaseAnalyticsService,
    AppObservableService,
    FormGeneratorService,
    File,
    Device,
    Base64,
    PreviewAnyFile,
    AppAuthGuardService,
    DocumentViewer,
    FileTransfer

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
