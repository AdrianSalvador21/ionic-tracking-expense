import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';

@Component({
  selector: 'app-date',
  template: `
    <mat-form-field class='demo-full-width margin-top w-100' [formGroup]='group' *ngIf="field.inputType === 'date'">
      <input style="color: #1e2642" matInput [matDatepicker]='picker' [formControlName]='field.name' [(ngModel)]="field.defaultValue" [required]="field.isRequired" [placeholder]='field.label'>
      <mat-datepicker-toggle matSuffix [for]='picker'></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-hint></mat-hint>
      <ng-container *ngFor='let validation of field.validations;' ngProjectAs='mat-error'>
        <mat-error *ngIf='group.get(field.name).hasError(validation.name)'>{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>

    <mat-form-field *ngIf="field.inputType === 'time'" [formGroup]='group'>
        <input style="color: #1e2642" [formControlName]='field.name' [required]="field.isRequired" matInput type="time" [placeholder]='field.label'>
    </mat-form-field>

    <mat-form-field *ngIf="field.inputType === 'dateTime'" [formGroup]='group'>
        <input style="color: #1e2642" [formControlName]='field.name' [required]="field.isRequired" matInput type="datetime-local" [placeholder]='field.label'>
    </mat-form-field>
  `,
  styles: []
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
