import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {AppObservableService} from "../../../../core/providers/app-observable.service";
import {FormGeneratorService} from "../../../../core/providers/form-generator.service";
import {File} from "@ionic-native/file/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import { Base64 } from '@ionic-native/base64/ngx';

import {Plugins, FilesystemDirectory, FilesystemEncoding, Capacitor} from '@capacitor/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducer";
import {SetReportAction} from "../../../../core/actions/reports.actions";
import {Router} from "@angular/router";
import { IValidUser, loggedInUserLocalStorageKey } from 'src/app/modules/security/valid-users';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.page.html',
  styleUrls: ['./new-report.page.scss'],
})
export class NewReportPage implements OnInit {
  basicSelected = '';
  amount = 5000;
  formData = [];
  showForm = false;
  loading;
  reportCustomFields = [];
  base64File = '';
  fileDir;
  filename;
  formDataValues;
  reportBasicData = {
    'title': '',
    'approver': ''
  };
  approvers: any[] = [];

  fullData;

  constructor(public file: File,
              public fileOpener: FileOpener,
              public fileChooser: FileChooser,
              public filePath: FilePath,
              private base64: Base64,
              public http: HttpClient,
              public nav: NavController,
              public router: Router,
              private store: Store<AppState>,
              public observableService: AppObservableService,
              public formGenService: FormGeneratorService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    // this.getReportFormat();
    this.store.select('reports').subscribe((state) => {
      this.reportBasicData = state.reportBasicData;
      this.approvers = state.approvers;
      console.log(this.approvers);
      this.getReportFormat();
    });
    /* this.formData = [
      {'type':'input','inputType':'text','name':'input','label':'Titulo','validations':[{'name':'required','message':'Input required'},{'name':'maxLength','message':'Invalid max length'},{'name':'minLength','message':'Invalid max length'}]},
      {'type':'input','inputType':'number','name':'input','label':'Número','validations':[{'name':'required','message':'Input required'},{'name':'maxLength','message':'Invalid max length'},{'name':'minLength','message':'Invalid max length'}]},
      {'type':'amount','inputType':'text','name':'input','label':'Anticipo','validations':[{'name':'required','message':'Input required'},{'name':'maxLength','message':'Invalid max length'},{'name':'minLength','message':'Invalid max length'}]},
      {'type':'select','label':'Política','name':'select','options':[{'placeholder':'Option 1','value':'option1'},{'placeholder':'Option 2','value':'option2'},{'placeholder':'Option 3','value':'option3'}]},
      {'type':'date','inputType':'date','name':'date','label':'Fecha'}];
    */
   console.log('fields', this.formData);;
   console.log('reportBasicData', this.reportBasicData);
  }

  async readExample(folder, filename) {
    let content = await this.file.readAsDataURL(folder, filename);
    return content;
  }


  goToDetail() {
    this.nav.navigateForward('/dashboard-tabs-menu/report-details');
  }

  goToReports() {
    this.nav.navigateBack('/dashboard-tabs-menu/reports');
  }

  async getReportFormat() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const url = '/api/ReportFormats';
    this.observableService.getService(true, url).subscribe((data) => {
      console.log(data);
      this.fullData = data;
      this.generateInputs(data.reportCustomFields);
      this.loading.dismiss();
    });
  }

  generateInputs(reportCustomFields) {
    this.reportCustomFields = [];
    this.formData = [];
    this.reportCustomFields = reportCustomFields;
    this.reportCustomFields.forEach((customField) => {
      let fieldConfig;
      switch (customField.inputType) {
        case 'Text':
          fieldConfig = this.formGenService.generateInputText(customField, 'input');
          if (fieldConfig.name === 'Título') {
            console.log(this.reportBasicData);
            fieldConfig.defaultValue = this.reportBasicData.title;
          }
          this.formData.push(fieldConfig);
          break;
        case 'Number':
          fieldConfig = this.formGenService.generateInputText(customField, 'number');
          this.formData.push(fieldConfig);
          break;
        case 'Date':
          fieldConfig = this.formGenService.generateDateInputDate(customField);
          this.formData.push(fieldConfig);
          break;
        case 'Dropdown':
          fieldConfig = this.formGenService.generateInputDropdown(customField);
          this.formData.push(fieldConfig);
          break;
        case 'File':
          fieldConfig = this.formGenService.generateDateInputFile(customField);
          this.formData.push(fieldConfig);
          break;
        default:
          break;
      }
    });

    this.showForm = true;
  }

  async addReport(formData) {
    this.formDataValues = formData;
    const request = this.generateRequest();
    const url = 'api/Reports';
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    this.observableService.createService(true, url, request).subscribe((data) => {
      console.warn(data);
      const action = new SetReportAction(data);
      this.store.dispatch(action);
      this.nav.navigateForward('/dashboard-tabs-menu/report-details');
      this.loading.dismiss();
      // const id = data.id;
      // const reportUrl = `/api/Reports/${id}`;
      /* this.observableService.getService(true, reportUrl).subscribe((data) => {
        console.log(data);
        console.log('REPORT DATA!!');
        this.loading.dismiss();
      });
       */

    });
  }


  generateRequest() {
    const loggedInUser: IValidUser = JSON.parse(localStorage.getItem(loggedInUserLocalStorageKey));
    
    let approverData = {};
    this.approvers.forEach((approver) => {
      if (approver.id === this.formDataValues.approver) {
        approverData = approver;
      }
    });

    const request = {
      id: 1,
      reportFormat: this.fullData,
      reportStatus: 1,
      reportFormartPrefix: this.fullData.prefix,
      externalId: 0,
      idCompany: loggedInUser.idCompany,
      idCreatedBy: loggedInUser.idUser,
      approver: approverData,
      adelanto: {
        id: 1,
        title: 'Adelanto',
        description: 'Description',
        amount: 500,
        tripLength: 1,
        adelantoStatus: 1,
        status: 1
      },
      reportInputFieldValues: this.generateRequestValues(),
      status: 1
    };

    return request;
  }

  generateRequestValues() {
    const requestValues = [];
    this.fullData.reportCustomFields.forEach((field) => {
      const fieldData = {
        id: field.id,
        reportId: field.id,
        reportCustomFieldId: 0,
        reportCustomField: field,
        value: this.formDataValues[field.name],
        status: 1
      };
      requestValues.push(fieldData);
    });

    return requestValues;
  }

}
