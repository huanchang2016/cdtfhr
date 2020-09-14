import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-three-position-type-cascader',
  templateUrl: './three-position-type-cascader.component.html',
  styleUrls: ['./three-position-type-cascader.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThreePositionTypeCascaderComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ThreePositionTypeCascaderComponent),
      multi: true
    }
  ]
})
export class ThreePositionTypeCascaderComponent implements ControlValueAccessor {

  @Input() placeholder?: string = '请选择职位类别';
  @Input() Size?: string = 'large';
  @Input() layer?: string = '';

  private propagateChange = (_: any) => { };

  constructor(
    private globalService: GlobalSettingsService
  ) { }

  values: any[];

  writeValue(obj: any[]): void {
    if (obj) {
      this.values = obj;
      console.log('this.values', obj)
    }else {
      this.values = [];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  isDisabled: boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanges(values: string[]): void {
    console.log(values, this.values, '职位类别  级联选择');
    this.propagateChange(this.values);
  }

  /** load data async execute by `nzLoadData` method */
  loadData = (node: NzCascaderOption, index: number): PromiseLike<void> => {

    return new Promise(resolve => {
      if (index < 0) {
        node.children = this.globalService.positionType;
        resolve();
      } else {
        let isLeaf: boolean = false;
        if (this.layer === 'second' || index > 0) {
          isLeaf = true;
        } else {
          isLeaf = false;
        }

        this.globalService.getPositionType(node.id).subscribe((res: ApiData) => {
          const children = res.data.map(v => {
            return {
              ...v,
              isLeaf: isLeaf
            }
          });
          node.children = children;
          // console.log(children);
          resolve();
        })
      }
    });
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.errors && control.errors.required) {
      return this.values && this.values.length !== 0 ? null : {
        isInvalid: {
          valid: false
        }
      }
    } else {
      return null;
    }
  }
}
