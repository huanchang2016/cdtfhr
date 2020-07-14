import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-range-month-picker',
  templateUrl: './range-month-picker.component.html',
  styleUrls: ['./range-month-picker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeMonthPickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RangeMonthPickerComponent),
      multi: true
    }
  ]
})
export class RangeMonthPickerComponent implements ControlValueAccessor {

  @Input() placeholder?:string[] = ['请选择开始日期', '请选择结束日期'];
  @Input() size?:string = null;
  @Input() isNow?:boolean = false;

  monthFormat:string = 'yyyy/MM';

  start_month:Date;
  end_month:any;

  values:string[] = [];

  is_now:boolean = true;

  private propagateChange = (_: any) => { };

  writeValue(obj: string[]): void {
    if(obj) {
      this.start_month = new Date(obj[0]);
      if(obj[1] === '至今') {
        this.is_now = true;
        this.end_month = null;
      }else {
        this.end_month = new Date(obj[1]);
      }
    }
  }

  valueChanges():void {
    let start:string = null;
    let end:string = null;
    this.values = [];
    if(this.start_month) {
      start = format(this.start_month, this.monthFormat);
      this.values[0] = start;
      if(this.is_now) {
        end = '至今';
        this.end_month = null;
        this.values[1] = end;
      }
      if(!this.is_now && this.end_month) {
        end = format(this.end_month, this.monthFormat);
        this.values[1] = end;
      }

    }

    console.log(start, end);
    this.propagateChange(this.values);
    
  }


  disabledDateStart = (current: Date): boolean => {
    // Can not select days before today and today
    let MaxMonth:Date;
    if(this.end_month) {
      MaxMonth = this.end_month.getTime() < (new Date()).getTime() ? this.end_month : new Date();
    }else {
      MaxMonth = new Date();
    }
    return differenceInCalendarDays(current, MaxMonth) > 0;
  };

  disabledDateEnd = (current: Date): boolean => {
    // Can not select days before today and today
    const startMonth:Date = this.start_month ? this.start_month : null;
    console.log(startMonth, 'start month')
    if(startMonth) {
      return differenceInCalendarDays(current, startMonth) < 0;
    }else {
      return differenceInCalendarDays(current, new Date()) > 0;
    }
    
  };


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.values[0] && this.values[1] ? null : {
      isInvalid: {
        valid: false
      }
    }
    // if(control.errors && control.errors.required) {
    //   return this.values[0] && this.values[1] ? null : {
    //     isInvalid: {
    //       valid: false
    //     }
    //   }
    // }else {
    //   return null;
    // }
  }
}
