import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { environment } from "../../../environments/environment";

@Injectable()
export class DownloadService {
  logoData = null;
  pdfObj = null;
  base64Image = null;
  photoPreview = null;

  constructor(public http: HttpClient, private platform: Platform, private file: File, private fileOpener: FileOpener) {
    //this.loadLocalAssetToBase64();
  }

  loadLocalAssetToBase64() {
    // this.http.get('/assets/images/public/branding/logo.png', { responseType: 'blob' }).subscribe((res) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     this.logoData = reader.result;
    //   };
    //   reader.readAsDataURL(res)
    // });
    this.http.get('/assets/images/public/branding/logo.png', { responseType: 'blob' })
      .subscribe(blob => {
        const reader = new FileReader();
        const binaryString1 = reader.readAsDataURL(blob);
        reader.onload = (event: any) => {
          console.log('Image in Base64: ', event.target.result);
          this.logoData = event.target.result;
        };

        reader.onerror = (event: any) => {
          console.log("File could not be read: " + event.target.error.code);
        };

      });

  }

  downloadPdf(expenses, useStorage?: true, reportData?: any) {

    reportData = JSON.parse(localStorage.getItem('reportData'));

    setTimeout(() => {

      console.log(reportData);

      console.warn(this.logoData);

      this.generateExpenses(expenses);
      let base64logo = "data:image/png;base64,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"
      // playground requires you to assign document definition to a variable called dd
      let dd = {
        content: [
          {
            columns: [
              {
                image: base64logo,
                width: 150,
              },
              [
                {
                  text: 'Reporte de gastos',
                  color: '#1e2642',
                  width: '*',
                  fontSize: 18,
                  bold: false,
                  alignment: 'right',
                  margin: [0, 0, 0, 2],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          // text 'Receipt No.'
                          text: '',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 10,
                          alignment: 'right',
                        },
                        {
                          text: 'EP-0004',
                          bold: true,
                          color: '#333333',
                          fontSize: 10,
                          alignment: 'right',
                          width: 100,
                          margin: [0, 0, 0, 10],
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Estatus',
                          color: '#1e2642',
                          fontSize: 10,
                          alignment: 'right',
                          width: '*',
                          margin: [0, 0, 0, 3]
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: '',
                          color: '#aaaaab',
                          bold: true,
                          fontSize: 10,
                          alignment: 'right',
                          width: '*',
                        },
                        {
                          text: this.setStatusLabel(reportData.reportStatus),
                          bold: true,
                          fontSize: 10,
                          alignment: 'right',
                          color: (reportData.reportStatus == 'Approved') ? 'green' : 'orange',
                          width: 100,
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          {
            columns: [
              {
                text: 'Enviado por',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                alignment: 'left',
                margin: [0, 30, 0, 3],
              },
              {
                text: 'Informar a',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                alignment: 'left',
                margin: [0, 30, 0, 3],
              },
              {
                text: '',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                alignment: 'left',
                margin: [0, 20, 0, 3],
              },
            ],
          },
          {
            columns: [
              {
                text: `${reportData.createdBy.name} ${reportData.createdBy.apellidoPaterno} \n ${reportData.createdBy.email}`,
                bold: false,
                fontSize: 9,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: `${reportData.approver.name} ${reportData.approver.apellidoPaterno} \n ${reportData.approver.email}`,
                bold: false,
                fontSize: 9,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: '',
                bold: false,
                fontSize: 9,
                color: '#333333',
                alignment: 'left',
              },
            ],
          },
          {
            columns: [
              {
                text: 'Enviado el',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                margin: [0, 10, 0, 3],
              },
              {
                text: 'Periodo del informe',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                margin: [0, 10, 0, 3],
              },
              {
                text: '',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                margin: [0, 10, 0, 3],
              },
            ],
          },
          {
            columns: [
              {
                text: (reportData.reportStatus == 'Approved') ? reportData.reportValues['Fecha de inicio del viaje'] : 'Pendiente: Aún no se ha aprobado el reporte',
                bold: false,
                fontSize: 9,
                color: '#333333',
              },
              {
                text: (reportData.reportStatus == 'Approved') ? reportData.reportValues['Fecha de termino del viaje'] : 'Pendiente: Aún no se ha aprobado el reporte',
                bold: false,
                fontSize: 9,
                color: '#333333',
              },
              {
                text: '',
                bold: false,
                fontSize: 9,
                color: '#333333',
              },
            ],
          },
          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: !!reportData.reportValues['Título'] ? reportData.reportValues['Título'] : '',
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 12,
          },
          {
            text: [reportData.reportValues['Descripción']],
            alignment: 'left',
            fontSize: 9,
            margin: [0, 5, 0, 20]
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function (i, node) {
                return 1;
              },
              vLineWidth: function (i, node) {
                return 1;
              },
              hLineColor: function (i, node) {
                if (i === 1 || i === 0) {
                  return '#bfdde8';
                }
                return '#eaeaea';
              },
              vLineColor: function (i, node) {
                return '#eaeaea';
              },
              hLineStyle: function (i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function (i, node) {
                return 10;
              },
              paddingRight: function (i, node) {
                return 10;
              },
              paddingTop: function (i, node) {
                return 2;
              },
              paddingBottom: function (i, node) {
                return 2;
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 150, 150],
              body: this.generateExpenses(expenses),
            },
          },
          '\n',
          '\n\n',
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function (i, node) {
                return 1;
              },
              vLineWidth: function (i, node) {
                return 1;
              },
              hLineColor: function (i, node) {
                return '#eaeaea';
              },
              vLineColor: function (i, node) {
                return '#eaeaea';
              },
              hLineStyle: function (i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function (i, node) {
                return 10;
              },
              paddingRight: function (i, node) {
                return 10;
              },
              paddingTop: function (i, node) {
                return 3;
              },
              paddingBottom: function (i, node) {
                return 3;
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [
                  {
                    text: 'Importe total de gasto',
                    border: [false, true, false, true],
                    fontSize: 9,
                    alignment: 'right',
                    margin: [0, 3, 0, 5],
                  },
                  {
                    border: [false, true, false, true],
                    text: 'MXN ' + this.getTotal(expenses).toFixed(2).toString(),
                    alignment: 'right',
                    fontSize: 9,
                    fillColor: '#f5f5f5',
                    margin: [0, 3, 0, 0],
                  },
                ],
              ],
            },
          },
          '\n\n',
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [180],
              body: [
                [{ text: '', border: [false, false, false, true], margin: [0, 0, 0, 15] }],
                [{ text: '', border: [false, false, false, false] }]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return 0.50;
              },
              vLineWidth: function (i, node) {
                return 0.50;
              }
            }
          },
          {
            columns: [
              {
                text: `Enviado por ${reportData.createdBy.name} ${reportData.createdBy.apellidoPaterno}`,
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                border: [true, false, false, true],
                alignment: 'left',
                margin: [0, 0, 0, 3],
              },
              {
                text: '',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                alignment: 'left',
                margin: [0, 0, 0, 3],
              },
              {
                text: '',
                color: '#1e2642',
                bold: true,
                fontSize: 9,
                alignment: 'left',
                margin: [0, 0, 0, 3],
              },
            ],
          }

        ],
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true,
            margin: [0, 50, 0, 3],
          },
          notesText: {
            fontSize: 10,
          },
        },
        defaultStyle: {
          columnGap: 20,
          //font: 'Quicksand',
        },
      };

      this.pdfObj = pdfMake.createPdf(dd);

      if (this.platform.is('cordova')) {
        console.warn('entre aca');
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'report.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'report.pdf', 'application/pdf');
          })
        });
      } else {
        this.pdfObj.download();
      }
    }, 1000);

  }

  download() {
    this.pdfObj.download();
  }

  downloadExcel() {

    let reportData = JSON.parse(localStorage.getItem('reportData'))

    const url = environment.apiUrl + `api/AdminReports/${reportData.id}/ExcelSheet`;

    if (this.platform.is('cordova')) {
      this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
        console.warn(data);
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        this.file.writeFile(this.file.dataDirectory, 'report.xlsx', blob, { replace: true }).then(fileEntry => {
          // Open the excel with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'report.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        })
      });
    } else {
      this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
        console.warn(data);
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const excel = window.URL.createObjectURL(blob);
        window.open(excel);
      });
    }


  }

  generateExpenses(expenses) {
    let generatedExpenses: any = [
      [
        {
          text: 'Detalles de gasto',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          border: [false, false, false, false],
          margin: [0, 5, 0, 5],
        },
        {
          text: 'Categoría',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Importe (MXN)',
          fontSize: 9,
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        }
      ]
    ];

    expenses.forEach((expense) => {
      let requestExpenses = [
        {
          text: expense.expenseValues['Comerciante'],
          fontSize: 9,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: expense.categoryName,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: 'MXN ' + expense.expenseValues['Monto'],
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
      ];

      generatedExpenses.push(requestExpenses);
    });


    console.log('GENERATED', generatedExpenses);
    return generatedExpenses;
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

  getTotal(expenses): number {
    let fullAmount = 0;

    expenses.forEach((expense) => {
      fullAmount = fullAmount + Number(expense.expenseValues['Monto']);
    });

    return +fullAmount;

  }
}
