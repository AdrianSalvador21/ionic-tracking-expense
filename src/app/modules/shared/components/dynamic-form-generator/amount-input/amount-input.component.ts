import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="demo-full-width" [formGroup]="group" style="width: 100% !important;">
      <input matInput currencyMask [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: []
})
export class AmountInputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
