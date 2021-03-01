import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';
import {CameraResultType, CameraSource, Capacitor, Plugins} from "@capacitor/core";
import {File} from "@ionic-native/file/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import {HttpClient} from "@angular/common/http";


const { Camera } = Plugins;

@Component({
  selector: 'app-input',
  template: `
    <div style="display: flex; flex-direction: column;">
      <mat-label style="font-size: 13px; margin-right: 7px; color: rgba(0,0,0,.54); font-size: 0.65rem; font-weight: 800;">
        {{field.label}}
        <span style="color: #ff3c2f">*</span>
        </mat-label>
      <div style="display: flex; align-items: center; margin-bottom: 1.5rem !important;">
        <button style="font-size: 11px; padding: 9px 40px; margin-right: 6px; width: 40%; color: white; background-color: #1d2542;" (click)="pickAnyFile()">Cargar</button>
        <p class="mb-0" style="font-size: 13px">{{filename}}</p>
      </div>
      <mat-form-field [hidden]="true" class="demo-full-width" [formGroup]="group" style="width: 100% !important;">
        <input matInput [formControlName]="field.name" [required]="field.isRequired" [(ngModel)]="field.defaultValue" [placeholder]="field.label" [type]="field.inputType">
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
      </mat-form-field>
    </div>
  `,
  styles: []
})
export class FileComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  base64File = '';
  fileDir;
  filename = '';
  image;

  constructor(public file: File, public fileOpener: FileOpener, public fileChooser: FileChooser, public filePath: FilePath, private base64: Base64, public http: HttpClient,) {
  }

  ngOnInit() {
  }

  pickAnyFile() {
    this.fileChooser.open().then(async (fileuri) => {


      console.log('fileuri', fileuri);

      const path = Capacitor.convertFileSrc(fileuri);
      const response = await fetch(path);
      const rawData = await response.blob();

      console.log('RAWWWW DATA', rawData);
      let reader = new FileReader();
      reader.readAsDataURL(rawData);
      reader.onloadend = () => {
        console.log('BASEEEEEEEEEEEEEEE 64444444444444444');
        let base64data = reader.result;
        console.log(base64data);
      };

      this.filePath.resolveNativePath(fileuri).then((nativepath) => {
        console.log('nativepath', nativepath);



        let filename = nativepath.substring(nativepath.lastIndexOf('/')+1);
        let folder = nativepath.substring(0, nativepath.lastIndexOf('/')+1);

        this.fileDir = folder;
        this.filename = filename;
        console.log('filename', filename);
        console.log('folder', folder);


        this.readText().then((data) => {
          console.log('read text', data);
        });

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

          this.base64File = base64File;
          console.log(this.base64File.length);
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

  readText(){
    let res;
    res = this.file.readAsDataURL(this.fileDir, this.filename)
      .then((resp) => {
        return resp;
      }).catch((err) =>
      {
        return "";
      });
    return res;
  };


  async newTicket() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      saveToGallery: true
    });

    console.log(image);

    this.image = image.dataUrl;

    // this.image = 'data:image/jpeg;base64,' + image.base64String;

  }
}
