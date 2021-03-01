import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../classes/field.interface';
@Component({
  selector: 'app-radiobutton',
  template: `
<div class="demo-full-width margin-top" [formGroup]="group" style="width: 100% !important;">
<label class="radio-label-padding">{{field.label}}:</label>
<mat-radio-group [formControlName]="field.name">
<mat-radio-button *ngFor="let item of field.options" [value]="item.placeholder">{{item.value}}</mat-radio-button>
</mat-radio-group>
</div>
`,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
