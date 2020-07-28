import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-test-input-access',
  templateUrl: './test-input-access.component.html',
  styleUrls: ['./test-input-access.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestInputAccessComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TestInputAccessComponent),
      multi: true
    }
  ]
})
export class TestInputAccessComponent implements ControlValueAccessor {

  constructor() { }


  @Input() placeholder?:string = '请选择日期';
  @Input() size?:string = 'large';

  private propagateChange = (_: any) => { };
  
  value:string;

  writeValue(obj: string): void {
    if(obj) {
      this.value = obj;
    }
  }

  valueChange() {
    this.propagateChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  isDisabled:boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    console.log('set disabled state', isDisabled);
    this.isDisabled = isDisabled;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.errors && control.errors.required) {
      return this.value ? null : {
        isInvalid: {
          valid: false
        }
      }
    }else {
      return null;
    }
  }
}
