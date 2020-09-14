import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-picker-month',
  templateUrl: './date-picker-month.component.html',
  styleUrls: ['./date-picker-month.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerMonthComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerMonthComponent),
      multi: true
    }
  ]
})
export class DatePickerMonthComponent implements ControlValueAccessor {

  @Input() placeholder?:string = '请选择日期';
  @Input() size?:string = 'large';

  dateFormat:string = 'yyyy/MM';

  private propagateChange = (_: any) => { };
  
  date:any;

  writeValue(obj: string): void {
    if(obj) {
      this.date = new Date(obj);
    }else {
      this.date = null;
    }
  }

  datePickerChange(date:Date):void {
    this.date = date;
    if(this.date) {
      this.propagateChange(format(this.date, 'yyyy-MM-dd'))
      // this.propagateChange(format(this.date, this.dateFormat))
    }else {
      this.propagateChange(null);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  
  isDisabled:boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.errors && control.errors.required) {
      return this.date ? null : {
        isInvalid: {
          valid: false
        }
      }
    }else {
      return null;
    }
  }
}
