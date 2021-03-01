import {Component, OnInit, ViewChild} from '@angular/core';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';
import {LoadingController, NavController, ToastController} from "@ionic/angular";
import {AppObservableService} from "../../../../core/providers/app-observable.service";
import {FormGeneratorService} from "../../../../core/providers/form-generator.service";
import {SetReportAction, SetSelectedInvoiceAction} from "../../../../core/actions/reports.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize, map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {DynamicFormComponent} from "../../../shared/components/dynamic-form-generator/dynamic-form/dynamic-form.component";
import {File} from "@ionic-native/file/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import { IValidUser, loggedInUserLocalStorageKey } from 'src/app/modules/security/valid-users';

const { Camera } = Plugins;

//Lenar datos del expense en caso de editar
// Ver facturas
@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false })
  public dynamicForm: DynamicFormComponent;
  basicSelected = '';
  imageUrl: string;
  imageFile; 
  amount = 5000;
  loading;
  showForm = false;
  formData = [];
  reportCustomFields = [];
  ticketData;
  formDataValues: any = {};
  fullData: any;
  reportData: any = {};
  invoiceData;
  uploadTicketMessage;
  expenseData;
  editingExpense;
  public categories = [];
  public apiUrl = environment.apiUrl;
  isEditing = false;
  constructor(public nav: NavController, public observableService: AppObservableService,
              public formGenService: FormGeneratorService,
              private store: Store<AppState>,
              private http: HttpClient,
              public file: File, public fileOpener: FileOpener, public fileChooser: FileChooser, public filePath: FilePath, private base64: Base64,
              public loadingController: LoadingController, public toastController: ToastController) { }

  ngOnInit() {
    this.uploadTicketMessage = "Escanear y adjuntar ticket";
    this.getCategories();
    // this.getTicketFormat();
    this.store.select('reports').subscribe((state) => {
      if (!!state.reportData) {
        this.reportData = state.reportData;
        console.log(this.reportData);
        if (this.reportData.editingExpense){
          this.editingExpense = this.reportData.editingExpense
          this.isEditing = true;
          if (this.editingExpense.ticket){
            this.ticketData = this.editingExpense.ticket;
            this.imageUrl = this.editingExpense.ticket.googleFile.url;
            if (this.imageUrl){
              this.uploadTicketMessage = "Reemplazar ticket";
            }
          }
          this.fillExpenseValues();
          if (!state.invoiceData && this.editingExpense.idFactura){
            this.getInvoice(this.editingExpense.idFactura);
          }
        } else {
          this.isEditing = false;
        }
      }

      if (!this.isEditing && !state.invoiceData){
        this.getExpenseFormat();
      }

      if (!!state.invoiceData) {
        this.invoiceData = state.invoiceData
        this.dynamicForm.setInvoiceData(this.invoiceData);
      }


    });

  }

  getInvoice(idFactura){
    const url = `/api/Facturas/${idFactura}`;
    this.observableService.getService(true, url).subscribe((data) => {
      this.invoiceData = data;
      this.loading.dismiss();
    });
  }

  async getCategories() {
    const url = '/api/ExpenseCategories';
    this.observableService.getService(true, url).subscribe((data) => {
      this.categories = data.data;
    });
  }

  async newTicket() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      saveToGallery: true
    });

    console.log(image);


    this.imageUrl = 'data:image/jpeg;base64,' + image.base64String;

    const url = '/api/Tickets';
    let request = {
      blob: this.imageFile
    };

    // console.log(this.image);
    this.observableService.createService(true, url, request).subscribe((data) => {
      this.ticketData = data;

      this.dynamicForm.setTicketData(this.ticketData);
      this.loading.dismiss();
    });
  }

  invoices() {
    this.nav.navigateForward('/dashboard-tabs-menu/invoices/5');
  }

  getTicketFormat() {
    const url = '/';
    this.observableService.createService(true, url, 'string').subscribe((data) => {
    });
  }

  async getExpenseFormat() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const url = '/api/ExpenseFormats';
    this.observableService.getService(true, url).subscribe((data) => {
      this.fullData = data;
      this.generateInputs(data.inputFields);
      this.dynamicForm?.setCategory(0);
      this.loading.dismiss();
    });
  }

  async fillExpenseValues(){
    if (!this.formDataValues.length){
      this.fullData = this.editingExpense.expenseFormat;
      this.generateInputs(this.editingExpense.expenseFormat.inputFields)
    }
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const inputFieldValues = this.editingExpense.inputFieldValues;
    let i =0;
    inputFieldValues.forEach(field => {
      this.formData[i].defaultValue = field.value;
      i++;
    });
    this.dynamicForm.setCategory(this.editingExpense.idExpenseCategory);
    this.loading.dismiss();

  }

  generateInputs(reportCustomFields) {
    this.formData=[];
    this.reportCustomFields = reportCustomFields;
    this.reportCustomFields.forEach((customField) => {
      let fieldConfig;
      switch (customField.inputType) {
        case 'Text':
          fieldConfig = this.formGenService.generateInputText(customField, 'input');
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async postExpense (body, url){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present(); 
    
    console.warn('A INSERTAR', this.reportData);
    let headers = new HttpHeaders().append('idCompany','1');
    this.http.post(this.apiUrl + url, body,{headers: headers, observe: 'response'}).pipe(
      map((data) => {
        console.log(data);
        if (data.status==200){
          this.presentToast('Gasto registrado correctamente.');
        } else {
          this.presentToast('Error al crear gasto.');
        }
        return data;
      }),
      finalize(() => {
        this.loading.dismiss();
        this.removeInputFields();
        this.ticketData = null;
        let report = this.reportData;
        report.id = this.reportData.id;
        this.dynamicForm.removeInvoice();
        const action = new SetReportAction(report);
        this.store.dispatch(action);
        const action2 = new SetSelectedInvoiceAction(null);
        this.store.dispatch(action2);
        this.nav.navigateBack('/dashboard-tabs-menu/report-details');
        // this.spinnerService.hide();
      }),
    ).subscribe();
  }

  async updateExpense (body, url){
    this.loading = await  this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present(); 
    
    body.id = this.editingExpense.id;
    for (let i=0; i< this.editingExpense.inputFieldValues.length;i++){
      body.inputFieldValues[i].id=this.editingExpense.inputFieldValues[i].id;
      body.inputFieldValues[i].expenseId=this.editingExpense.id;
    }

    console.warn('A UPDATEAR', this.reportData);
    let headers = new HttpHeaders().append('idCompany','1');
    this.http.put(this.apiUrl + url, body,{headers: headers,observe: 'response'}).pipe(
      map((data) => {
        console.log(data);
        if (data.status==200){
          this.presentToast('Gasto editado correctamente.');
        } else {
          this.presentToast('Error al editar gasto.');
        }
        
        return data;
      }),
      finalize(() => {
        this.editingExpense = null;
        this.isEditing = false;
        this.loading.dismiss();
        this.removeInputFields();
        this.ticketData = null;
        this.imageUrl = "";
        let report = this.reportData;
        report.editingExpense = this.editingExpense;
        report.id = this.reportData.id;

        const action = new SetReportAction(report);
        this.store.dispatch(action);
        this.nav.navigateBack('/dashboard-tabs-menu/report-details');
        // this.spinnerService.hide();
      }),
    ).subscribe();
  }

  async addExpense(formData) {

    this.formDataValues = formData;
    const request = this.generateRequest();
    if (!this.ticketData ){
      request.ticket = null;
    }
    this.reportData = JSON.parse (localStorage.getItem("reportData"));
    // const url = '/api/Reports/20/Expenses';
    let url = `api/Reports/${this.reportData.id}/Expenses`;
    if (this.isEditing){
      url+=`/${this.editingExpense.id}`
      this.updateExpense(request,url);
    } else {
      this.postExpense(request,url); 
    }
    
    localStorage.setItem('reportDataId', this.reportData.id);
    
    /*if (!!this.imageUrl) {
      const request2 = this.generateRequest();
      const url2 = `/api/Reports/${this.reportData.id}/Expenses/18/Ticket`;
      this.observableService.patchServiceImage(true, url2, request2, this.imageFile).subscribe((ticketResult) => {
        console.log('TICKET RESULT', ticketResult);
        this.loading.dismiss();
      });
    } else {
      this.loading.dismiss();
    }*/


    /*this.observableService.createServiceImage(true, url, request, this.imageFile).subscribe((data) => {
      console.log('EXPENSE', data);
      localStorage.setItem('expenseId', data.id);
      this.reportData['lastExpense'] = data;
      const action = new SetReportAction(this.reportData);
      this.store.dispatch(action);

      this.loading.dismiss();

      /* if (!!this.image) {
        const request2 = this.generateRequest();
        const url2 = `/api/Reports/${this.reportData.id}/Expenses/${data.id}/ticket`;
        this.observableService.createServiceImage(true, url2, request2, this.image).subscribe((ticketResult) => {
          console.log('TICKET RESULT', ticketResult);
          this.loading.dismiss();
        });
      } else {
        
      } */

      // this.nav.navigateBack('/dashboard-tabs-menu/report-details');
    //});
  }

  getInvoiceId() {
    if (!!this.invoiceData) {
      return Number(this.invoiceData.id);
    } else {
      return 0;
    }
  }

  generateRequest() {
    const loggedInUser: IValidUser = JSON.parse(localStorage.getItem(loggedInUserLocalStorageKey));
    
    const request = {
      id: 0,
      inputFieldValues: this.generateRequestValues(),
      idExpenseCategory: this.formDataValues.category,
      expenseFormat: this.fullData,
      ticket: this.ticketData?this.ticketData:null,
      idFactura: this.getInvoiceId(),
      idCompany: loggedInUser.idCompany,
      idCreatedBy: loggedInUser.idUser,
      status: 1
    };

    /* if (!!this.image) {
      request['fileBlobViewModel'] = {
        blob: this.image
      }
    }
     */

    return request;
  }

  generateRequestValues() {
    const requestValues = [];
    this.fullData.inputFields.forEach((field) => {
      const fieldData = {
        id:0,
        expenseId:0,
        inputFieldId: field.id,
        inputField: field,
        value: this.formDataValues[field.name],
        googleFile: {
          id: 0,
          url: 'string',
          selfLink: 'string',
          filename: 'string',
          status: 0
        },
        status: 1
      };
      requestValues.push(fieldData);
    });

    return requestValues;
  }

  back (){
    this.removeInputFields();
    this.dynamicForm?.removeInvoice();
    this.dynamicForm?.setCategory(0);
    let report = this.reportData;
    report.editingExpense = null;
   // const action2 = new SetReportAction(report);
    //this.store.dispatch(action2);
    const action = new SetSelectedInvoiceAction(null);
    this.store.dispatch(action);
    this.nav.navigateBack('/dashboard-tabs-menu/report-details');
  }

  removeInputFields (){
    this.ticketData = null;
    this.imageUrl = null;
    this.imageFile = null;
    this.uploadTicketMessage = "Escanear y adjuntar ticket";
    this.removeInvoiceData();
    this.dynamicForm.setCategory(0);
    this.dynamicForm.resetData(this.fullData.inputFields.map ((field)=> {return field.name}))
  }
  removeInvoiceData() {
    this.invoiceData = null;
  }

  createExpensService(id, url, param) {
    let mainHeaders = {
      'Content-Type': 'application/json',
      'idCompany': '1',
      'idUser': '11',
      'id': id
    };

    const body = param;
    // const body = JSON.stringify(param);
    return this.http.post(this.apiUrl + url, body, {
      headers: new HttpHeaders(mainHeaders)
    }).pipe(
      map((data) => {
        return data;
      }),
      finalize(() => {
        // this.spinnerService.hide();
      }),
    );
  }

  async ticketChanged() {
    this.imageFile = (<HTMLInputElement>document.getElementById('selectedFile')).files[0];
    this.getBase64(this.imageFile).then(
      data => {
        this.imageUrl = data as string;
        this.uploadTicketMessage = "Reemplazar ticket";
      }
    );
  }

  async uploadTicket (){
    this.ticketChanged();
    let formData: FormData = new FormData();
    this.imageFile = (<HTMLInputElement>document.getElementById('selectedFile')).files[0];
    if (!this.imageFile){
      return;
    }

    formData.append("ticket", this.imageFile);
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present(); 
		// Here we can append the other command properties
    const url = "api/Tickets";
    this.http.post(this.apiUrl + url, formData).pipe(
      map((data) => {
        this.ticketData = data;
        //this.spinnerService.show();
        if (!this.invoiceData){
          this.dynamicForm.setTicketData(this.ticketData);
        }
        
        return data;
      }),
      finalize(() => {
        this.loading.dismiss();
        // this.spinnerService.hide();
      }),
    ).subscribe();
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  clearTicket (){
    this.ticketData=null;
    this.imageFile=null;
    this.imageUrl="";
    this.uploadTicketMessage = "Escanear y adjuntar ticket"
  }

  pickAnyFile() {
    this.fileChooser.open().then(async (fileuri) => {
      console.log('fileuri', fileuri);
      const path = Capacitor.convertFileSrc(fileuri);
      const response = await fetch(path);
      const rawData = await response.blob();

      console.log('RAWWWW DATA', rawData);
      this.imageFile = rawData;
      let reader = new FileReader();
      reader.readAsDataURL(rawData);
      reader.onloadend = () => {
        console.log('BASEEEEEEEEEEEEEEE 64444444444444444');
        let base64data = reader.result;
        console.log(base64data);
      };

      this.filePath.resolveNativePath(fileuri).then((nativepath) => {
        let filename = nativepath.substring(nativepath.lastIndexOf('/')+1);
        let folder = nativepath.substring(0, nativepath.lastIndexOf('/')+1);
        console.log('filename', filename);
        console.log('folder', folder);

        this.file.readAsDataURL(folder, filename).then(base64File => {
          console.log("here is encoded image!!!!!! ", base64File)
        }).catch((e) => {
          console.log(e);
          console.log('Error reading file');
        });

        const example = this.file.readAsBinaryString(folder, filename).then((data) => {
          console.log(data);
        }).catch(e => {
          console.log(e);
        });

        console.log('example', example);

        let str: string;
        str = btoa(nativepath);

        console.log('BTOA EXAMPLLLEEEE', str);


        this.base64.encodeFile(nativepath).then((base64File: string) => {
          console.log(nativepath);
          console.log(base64File);
          console.log('base64File' ,base64File);
        }, (err) => {
          console.log(err);
        }).catch(error => {
          console.log(error);
        });

        this.base64.encodeFile(fileuri).then((base64File) => {
          console.log('base64File file uri', base64File);
        }, (err) => {
          console.log(err);
        });
      })
    });
  }
}
