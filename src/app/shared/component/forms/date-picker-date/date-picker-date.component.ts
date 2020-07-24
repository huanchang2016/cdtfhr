import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-picker-date',
  templateUrl: './date-picker-date.component.html',
  styleUrls: ['./date-picker-date.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerDateComponent),
      multi: true
    }
  ]
})
export class DatePickerDateComponent implements ControlValueAccessor {

  @Input() placeholder?:string = '请选择日期';
  @Input() size?:string = 'large';

  dateFormat:string = 'yyyy/MM/dd';

  private propagateChange = (_: any) => { };
  
  date:Date;

  writeValue(obj: string): void {
    if(obj) {
      this.date = new Date(obj);
    }
  }

  datePickerChange(date:Date):void {
    this.date = date;
    this.propagateChange(format(this.date, this.dateFormat))
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
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
