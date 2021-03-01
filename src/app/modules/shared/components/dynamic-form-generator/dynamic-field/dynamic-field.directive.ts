import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../classes/field.interface';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';
import {SelectComponent} from '../select/select.component';
import {DateComponent} from '../date/date.component';
import {RadiobuttonComponent} from '../radiobutton/radiobutton.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {AmountInputComponent} from "../amount-input/amount-input.component";
import {FileComponent} from "../file/file.component";


const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  amount: AmountInputComponent,
  file: FileComponent
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;

  constructor(
    protected resolver: ComponentFactoryResolver,
    protected container: ViewContainerRef
  ) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
