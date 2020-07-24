import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-range-date-picker-c',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RangeDatePickerComponent),
      multi: true
    }
  ]
})
export class RangeDatePickerComponent implements ControlValueAccessor {

  @Input() placeholder?:string = '请选择日期';
  @Input() size?:string = 'large';

  dateFormat:string = 'yyyy/MM/dd';

  private propagateChange = (_: any) => { };
  
  date:Date[];

  writeValue(obj: string[]): void {
    if(obj) {
      this.date = [new Date(obj[0]), new Date(obj[1])];
    }
  }

  datePickerChange(date:Date[]):void {
    this.date = date;
    console.log(date, 'date change');
    this.propagateChange([format(this.date[0], this.dateFormat), format(this.date[1], this.dateFormat)])
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.errors && control.errors.required) {
      return this.date && this.date.length !== 2 ? null : {
        isInvalid: {
          valid: false
        }
      }
    }else {
      return null;
    }
  }
}
