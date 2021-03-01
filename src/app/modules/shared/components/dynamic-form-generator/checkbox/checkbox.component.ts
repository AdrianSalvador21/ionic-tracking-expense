import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class='demo-full-width margin-top' [formGroup]='group' style="width: 100% !important;">
      <mat-checkbox [formControlName]='field.name'>{{field.label}}</mat-checkbox>
    </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
