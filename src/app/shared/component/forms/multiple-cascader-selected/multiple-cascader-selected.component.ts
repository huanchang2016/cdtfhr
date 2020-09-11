import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-multiple-cascader-selected',
  templateUrl: './multiple-cascader-selected.component.html',
  styleUrls: ['./multiple-cascader-selected.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleCascaderSelectedComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultipleCascaderSelectedComponent),
      multi: true
    }
  ]
})
export class MultipleCascaderSelectedComponent implements OnChanges, ControlValueAccessor {
  /*****  三级级联多选
   * 
   * isLeaf: boolean = true | false // 确定层级是否已经完全展示
   * total: number; // 判断多选的数据条数
   * 
   * type: string = 'city' | 'position_type' .... // 类型有 城市， 职位类别 
   *      根据类型判断当前调用的是哪个配置项， 如： city 则调用 省市区 数据， position_type 则调用职位类别数据
   * layer: string = 'second' | 'three' // 层级数，如： second 表示 选择 省市  两层，  three 则表示三层
   *      加载数据时，根据node.level  和 layer 判断当前数据是否为 最后一层。
   * ******/
  

  @Input() placeholder?:string = '请选择省市区';
  @Input() type:string;
  @Input() layer?:string = 'three';
  @Input() size?:string = 'large';

  values?: number[] = [];
  nodes:any[] = [];

  constructor(
    private globalService: GlobalSettingsService
  ) { }

  ngOnChanges() {
    if(this.type) {
      if(this.type === 'city') {
        this.nodes = this.globalService.cities;
      }else if(this.type === 'position_type') {
        this.nodes = this.globalService.positionTypeAll;
      }
    }
  }

  onChange($event: number[]): void {
    
    console.log('ssss', this.values);
    this.propagateChange(this.values);
  }

  private propagateChange = (_: any) => { };

  writeValue(obj: any[]): void {
    console.log(obj, 'multiple .....')
    if(obj) {
      this.values = obj;
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
      return (this.values && this.values.length !== 0) ? null : {
        isInvalid: {
          valid: false
        }
      }
    }else {
      return null;
    }
  }
}
