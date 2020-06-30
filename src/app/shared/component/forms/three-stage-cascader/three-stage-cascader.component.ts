import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

const provinces = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  }
];

const cities: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  zhejiang: [
    {
      value: 'hangzhou',
      label: 'Hangzhou'
    },
    {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }
  ],
  jiangsu: [
    {
      value: 'nanjing',
      label: 'Nanjing'
    }
  ]
};

const scenicspots: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }
  ]
};

@Component({
  selector: 'app-three-stage-cascader',
  templateUrl: './three-stage-cascader.component.html',
  styleUrls: ['./three-stage-cascader.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThreeStageCascaderComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ThreeStageCascaderComponent),
      multi: true
    }
  ]
})
export class ThreeStageCascaderComponent implements ControlValueAccessor {
  
  @Input() placeholder?:string = '请选择省市区';


  private propagateChange = (_: any) => { };
  
  values:any[];

  writeValue(obj: any[]): void {
    if(obj) {
      this.values = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  /** load data async execute by `nzLoadData` method */
  loadData(node: NzCascaderOption, index: number): PromiseLike<void> {
    return new Promise(resolve => {
      console.log(node, 'load data ')
      setTimeout(() => {
        if (index < 0) {
          // if index less than 0 it is root node
          node.children = provinces;
        } else if (index === 0) {
          node.children = cities[node.value];
        } else {
          node.children = scenicspots[node.value];
        }
        resolve();
      }, 1000);
    });
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.errors && control.errors.required) {
      return this.values && this.values.length !== 0 ? null : {
        isInvalid: {
          valid: false
        }
      }
    }else {
      return null;
    }
  }
}
