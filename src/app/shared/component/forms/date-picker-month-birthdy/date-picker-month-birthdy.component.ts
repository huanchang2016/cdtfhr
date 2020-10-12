import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-date-picker-month-birthdy',
  templateUrl: './date-picker-month-birthdy.component.html',
  styleUrls: ['./date-picker-month-birthdy.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerMonthBirthdyComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerMonthBirthdyComponent),
      multi: true
    }
  ]
})
export class DatePickerMonthBirthdyComponent implements ControlValueAccessor {
  
  // 根据需求修改了出生日期的上传格式

  @Input() placeholder?:string = '请选择日期';
  @Input() size?:string = 'large';

  defaultDateValue:Date;
  
  constructor() {
    const today:Date = new Date();
    this.defaultDateValue = new Date(`${today.getFullYear() - 16}/${today.getMonth() + 1}/${today.getDate()}`);
  }

  dateFormat:string = 'yyyy/MM/dd';

  private propagateChange = (_: any) => {};
  
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


  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today birthday  > 1940 年 ， 且年龄大于16岁
    const showMonth:boolean = differenceInCalendarDays(current, this.defaultDateValue) > 0 || differenceInCalendarDays(current, new Date('1940/01/01')) < 0;
    return showMonth;
    // return differenceInCalendarDays(current, this.defaultDateValue) > 0;
  };

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
