import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'util';
import { NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

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
export class MultipleCascaderSelectedComponent implements ControlValueAccessor {

  @Input() placeholder?:string = '请选择省市区';
  @Input() size?:string = 'large';

  values?: number[] = [];
  nodes:any[] = [];
  
  constructor(
    private globalService: GlobalSettingsService
  ) {
    let province:any[] = this.globalService.province;
    console.log(province)
    if(province.length !== 0) {
      this.nodes = province.map( v => {
        let d = {
          title: v.name,
          value: v.id,
          key: v.id,
          disabled: true,
          children: []
        }
        this.loadNode(v.id).then( data => d.children = data);
        return d;
      })
    }else {
      console.log('获取级联信息第一层数据')
      // setTimeout(() => {
      //   province = this.globalService.province;
      //   console.log('pro', province)
      //   this.nodes = province.map( v => {
      //     let d = {
      //       title: v.name,
      //       value: v.id,
      //       key: v.id,
      //       disabled: true,
      //       children: []
      //     }
      //     this.loadNode(v.id).then( data => d.children = data);
      //     return d;
      //   })
      // }, 1000);
    }
  }


  onExpandChange(e: NzFormatEmitEvent): void {
    const node = e.node;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.loadNode(node.origin.value).then(data => {
        node.addChildren(data);
      });
    }
  }

  loadNode(key:number): Promise<NzTreeNodeOptions[]> {
    return new Promise(resolve => {
      this.globalService.getCities(key).subscribe( (res:ApiData) => {
        const children:any[] = res.data.map( v => {
          return {
            title: v.name,
            value: v.id,
            key: v.id,
            isLeaf: true
          }
        });
        resolve(children);
      })
    });
  }

  onChange($event: number[]): void {
    
    if(this.values.length < 4) {
      this.values = $event;
    }
    console.log($event, 'value: ', this.values);
    this.propagateChange(this.values);
  }

  private propagateChange = (_: any) => { };

  writeValue(obj: string): void {
    if(obj) {
      
    }
  }


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
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
