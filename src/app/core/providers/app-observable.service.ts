import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
// Operators
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, finalize, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {LoadingController} from "@ionic/angular";
import { IValidUser, loggedInUserLocalStorageKey, getActiveUser } from 'src/app/modules/security/valid-users';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable()
export class AppObservableService {
  public apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController
  ) {
  }

  private getHeaders(extraHeaders: StringMap = {}): HttpHeaders {
    const loggedInUser: IValidUser = getActiveUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'idUser': loggedInUser.idUser.toString(),
      'idCompany': loggedInUser.idCompany.toString(),
      'idApprover': loggedInUser.idApprover.toString(),
      'id': !!localStorage.getItem('expenseId') ? localStorage.getItem('expenseId').toString() : '1',
      'idReport': !!localStorage.getItem('reportId') ? localStorage.getItem('reportId').toString() : '0',
      'idExpenseCategory': !!localStorage.getItem('expenseId') ? localStorage.getItem('expenseId').toString() : '0',
      // 'Authorization': 'Basic' + btoa(username + ":" + password)
      ...extraHeaders
    });

    return headers;
  }

  /**
   * @RQ GET
   * @param loading - shows fullscreen loader
   * @param url - endpoint url
   */
  getService(loading: boolean, url: string, loadingController?): Observable<any> {
    if (loading === true) {
      loadingController?.present();
      // this.spinnerService.show();
    }

    return this.http.get(this.apiUrl + url, { headers: this.getHeaders() }).pipe(
      map((data) => {
        let body;
        console.log(data);
        return data;
      }),
      finalize(() => {
        loadingController?.dismiss();
        // this.spinnerService.hide();
      })
    );
  }

  createService(loading: boolean, url: string, param: any, headers?): Observable<any> {
    if (loading === true) {
      // this.spinnerService.show();
    }

    this.getHeaders();

    const body = param;
    return this.http.post(this.apiUrl + url, body, { headers: headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      finalize(() => {
        // this.spinnerService.hide();
      }),
    );
  }

  // patchServiceImage(loading: boolean, url: string, param: any, blob: any): Observable<any> {
  //   if (!!loading) {
  //     // this.spinnerService.show();
  //   }

  //   const formData = new FormData();
  //   formData.append('ticket', blob);

  //   const headers = this.configureHeaders();

  //   headers.set('enctype', 'multipart/form-data; boundary=WebAppBoundary');
  //   headers.set('Content-Type', 'multipart/form-data; boundary=WebAppBoundary');
  //   headers.set('Referer', 'http://localhost:8100');

  //   const body = JSON.stringify(param);
  //   return this.http.patch(this.apiUrl + url, formData, { headers: headers }).pipe(
  //     map((data) => {
  //       console.log('REPORRRRRTTTT!!!', data);
  //     }),
  //     finalize(() => {
  //     })
  //   );
  // }

  patchService(loading: boolean, url: string, param: any, extraHeaders?: StringMap): Observable<any> {
    if (!!loading) {
      //this.spinnerService.show();
    }

    const body = JSON.stringify(param);
    return this.http.patch(this.apiUrl + url, body, { headers: this.getHeaders(extraHeaders) }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      finalize(() => {
        
      })
    );
  }


  // createServiceImage(loading: boolean, url: string, param: any, blob: any): Observable<any> {
  //   if (!!loading) {
  //     // this.spinnerService.show();
  //   }

  //   const formData = new FormData();
  //   formData.append('ticket', blob);
  //   const body = param;
  //   formData.append('expenseViewModel', body);

  //   this.options = {headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'idCompany': '1',
  //       'idUser': '11',
  //       'id': localStorage.getItem('reportDataId').toString()
  //     })};

  //   return this.http.post(this.apiUrl + url, formData, this.options).pipe(
  //     map((data) => {
  //       console.log('REPORRRRRTTTT!!!', data);
  //     }),
  //     finalize(() => {
  //     })
  //   );
  // }

  // private extractData(res: HttpResponse<any>) {
  //   const body = res;
  //   return body || {};
  // }

  // private handleError(error: any) {
  //   const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

  //   return observableThrowError(errMsg);
  // }
}
