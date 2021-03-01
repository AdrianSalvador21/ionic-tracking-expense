import { Injectable } from '@angular/core';
import {Validators} from '@angular/forms';

@Injectable()
export class FormGeneratorService {
  constructor() {}

  public generateInputText(data, type) {
    const validations = [];
    let fieldConfig = {
      type: 'input',
      inputType: type,
      name: `${data.name}`,
      label: data.name,
      isRequired: data.isRequired === 1,
      placeholder: data.defaultValue
    };
    if (data.isRequired === 1) {
      validations.push({
        name: 'required',
        validator: Validators.required,
        message: 'Input required'
      });
    }
    validations.push({
      name: 'maxLength',
      validator: Validators.maxLength(50),
      message: 'Invalid max length'
    });
    validations.push({
      name: 'minLength',
      validator: Validators.minLength(1),
      message: 'Invalid min length'
    });
    Object.assign(fieldConfig, {validations: validations});
    return fieldConfig;
  }

  public generateDateInputDate(data) {
    const validations = [];
    let fieldConfig = {
      type: 'date',
      inputType: 'date',
      name: `${data.name}`,
      label: data.name,
      isRequired: data.isRequired === 1,
      defaultValue: !!data.defaultValue ? data.defaultValue : ''
    };

    if (data.isRequired === 1) {
      validations.push({
        name: 'required',
        validator: Validators.required,
        message: 'Input required'
      });
    }

    console.log(data.defaultValue);
    console.log(new Date(data.defaultValue));
    if (!!data.defaultValue) {
      fieldConfig.defaultValue = new Date(data.defaultValue);
    }

    Object.assign(fieldConfig, {validations: validations});

    return fieldConfig;
  }

  public generateDateInputFile(data) {
    let fieldConfig = {
      type: 'file',
      inputType: 'file',
      name: `${data.name}`,
      label: data.name,
      isRequired: data.isRequired === 1,
      defaultValue: !!data.defaultValue ? data.defaultValue : ''
    };
    return fieldConfig;
  }

  public generateInputDropdown(data) {
    const validations = [];
    let options = [];

    if (!!data.reportDropDownValues) {
      data.reportDropDownValues.forEach((value) => {
        console.log(value);
        if (value.status === 1) {
          options.push({placeholder: value.displayText, value: value.id})
        }
      });
    } else {
      data.dropDownValues.forEach((value) => {
        console.log(value);
        if (value.status === 1) {
          options.push({placeholder: value.displayText, value: value.id})
        }
      });
    }


    let fieldConfig = {
      type: 'select',
      label: data.name,
      name: `${data.name}`,
      options: options,
      isRequired: data.isRequired === 1,
      defaultValue: !!data.defaultValue ? Number(data.defaultValue) : ''
    };


    if (!!data.reportDropDownValues) {
      if (data.reportDropDownValues.length > 0) {
        fieldConfig.defaultValue = data.reportDropDownValues[0].id;
      }
    } else {
      if (data.dropDownValues.length > 0) {
        fieldConfig.defaultValue = data.dropDownValues[0].id;
      }
    }


    if (data.isRequired === 1) {
      validations.push({
        name: 'required',
        validator: Validators.required,
        message: 'Input required'
      });
    }
    Object.assign(fieldConfig, {validations: validations});

    return fieldConfig;
  }
}
