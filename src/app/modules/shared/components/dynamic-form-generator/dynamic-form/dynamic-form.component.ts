import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';
import {NavController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../app.reducer";

@Component({
  exportAs: 'app-dynamic-Form',
  selector: 'app-dynamic-form',
  template: `
    <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <form class="dynamic-form example-form mt-2r" style="width: 100% !important;" [ngClass]="{'mb-6r': showMb}" [formGroup]="form" (submit)="onSubmit($event)">
                  
        <div class="w-100" *ngIf="!showApprover && !!invoiceData">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
              <div>
                <mat-label class="w-100" style="font-size: 11px; color: rgba(0,0,0,.54); font-weight: 600;">Factura</mat-label>
                <p class="mb-0 ft-12" style="font-weight: 700;">{{invoiceData?.emisor?.nombre}}</p>
              </div>

              <ion-icon (click)="removeInvoice()" name="close-circle-outline" class="cursor-pointer" style="font-size: 1rem; height: 1rem; color: #ff3c2f !important; width: 1.3rem; margin-right: 0.2rem; font-weight: 500; margin-left: 0.2rem;"></ion-icon>

            </div>
          </div>

          <div class="w-100" *ngFor="let field of fields;">
            <ng-container dynamicField [field]="field" [group]="form">
            </ng-container>
          </div>
          
          <div class="w-100" *ngIf="showApprover">
            <mat-form-field class="w-100">
              <mat-label>Aprobador</mat-label>
              <mat-select name="approver" formControlName="approver" [(ngModel)]="reportBasicData.approver" required>
                <mat-option *ngFor="let approver of approvers" [value]="approver?.id">{{approver?.name}}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="w-100" *ngIf="!showApprover">
            <mat-form-field class="w-100">
              <mat-label>Categoría</mat-label>
              <mat-select name="category" formControlName="category" required>
                <mat-option value="">Selecciona una categoría</mat-option>
                <mat-option *ngFor="let category of categories" [value]="category?.id">{{category?.name}}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>


          <div class="button-container display-center mt-0" [ngClass]="{'mb-3': !showMb}">
            <ion-button class="new-report-button primary" (click)="goToDetail()">Aceptar</ion-button>
            <ion-button class="new-report-button secondary mr-0" (click)="goToReports()">Cancelar</ion-button>
          </div>
        </form>
    </div>
  `,
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() showMb: boolean;
  @Input() categories: any = [];
  @Input() showApprover: boolean = false;
  @Input() reportBasicData: any;
  @Input() invoiceData: any;
  @Input() ticketData: any = {};
  // tslint:disable-next-line:no-output-native
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeInvoiceEmitter: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  approvers = [];

  get value() {
    return this.form.value;
  }

  constructor(protected fb: FormBuilder, public nav: NavController, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.form = this.createControl();
    this.store.select('reports').subscribe((state) => {
      console.log(state);
      this.approvers = state.approvers;
    });
    console.warn(this.fields);
  }
  ngOnChanges( changes){
    
    if (changes.fields){
      this.form = this.createControl();
    }
    
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  setTicketData(data) {
    if (!!data.merchantName) {
      this.form.controls['Comerciante'].setValue(data.merchantName);
    }

    if (!!data.totalAmount) {
      this.form.controls['Monto'].setValue(data.totalAmount);
    }

    if (!!data.date) {
      this.form.controls['Fecha'].setValue(data.date);
    }
  }

  setInvoiceData(data) {
    this.form.controls['Comerciante'].setValue(data.emisor.nombre);
    this.form.controls['Monto'].setValue(data.subTotal);
    this.form.controls['Fecha'].setValue(data.fechaTimbrado);
  }

  resetData (fieldNames){
    fieldNames.forEach(field => {
      this.form.controls[field].setValue(null);
    });
    this.form.controls['category'].setValue(null);
    this.removeInvoice();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  setCategory (idCategory){
    this.form.controls['category'].setValue(idCategory);
  }

  removeInvoice() {
    this.invoiceData = null;
    this.removeInvoiceEmitter.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});

    if (this.showApprover) {
      const approverControl = this.fb.control(
        ''
      );
      group.addControl('approver', approverControl);
    } else {
      const categoryControl = this.fb.control(
        ''
      );
      group.addControl('category', categoryControl);
    }

    this.fields.forEach(field => {
      if (field.type === 'button') return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (!!validations && validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

  goToDetail() {
    console.log(this.form);
    console.log(this.form.getRawValue());
    if (this.form.invalid) {
      this.formTouched(this.form);
      return;
    }

    this.submit.emit(this.form.getRawValue());
    // this.nav.navigateForward('/dashboard-tabs-menu/report-details');
  }

  goToReports() {
    this.nav.navigateBack('/dashboard-tabs-menu/reports');
  }

  formTouched(form) {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].markAsTouched();
    });
  }
}
