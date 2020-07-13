import { FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-user-admin-education',
  templateUrl: './user-admin-education.component.html',
  styleUrls: ['./user-admin-education.component.less']
})
export class UserAdminEducationComponent implements OnInit {
  @Output() stepsChange:EventEmitter<any> = new EventEmitter();

  eduOptions:any = {};

  list:any[] = [1];

  index:number = 2;

  // 所有的子组件表单 开始验证
  isSubmitCheck:boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }

  submit() {
    // 先提交信息， 然后向上传递  下一步的指令
    this.isSubmitCheck = true;
    setTimeout(() => {
      console.log(this.isAllValid, 'isAllvalid');
      if(this.isAllValid) {
        console.log('success');
        this.steps('next');
      }else {
        this.isAllValid = true;
        this.list.forEach( item => {
          if(!this.eduOptions[item]) {
            this.isAllValid = false;
          }
        });
        if(this.isAllValid) {
          console.log('error change success');
          this.steps('next');
        }
      }
      
    }, 100);
    
  }

  isAllValid:boolean = true;

  isNotValid(valid:boolean) {
    this.isAllValid = valid;
    console.log(this.isAllValid);
  }

  steps(type: string) {
    this.stepsChange.emit(type);
  }

  add(e:Event) {
    e.preventDefault();
    e.stopPropagation();

    this.list.push(this.index);
    this.index++;
  }

  deleted(item:number) {
    if(this.list.length > 1) {
      this.list = this.list.filter( v => v !== item);
      delete this.eduOptions[item];
      console.log(this.eduOptions, 'deleted eduOptions');
    }
  }

  cancel() {}

  formValidChange({index, form}) {
    if(form.valid) {
      
      this.eduOptions[index] = form.value;
      console.log(this.eduOptions, 'valid eduOptions');
    }
  }

  submitForm(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.eduOptions);
    });
    
  }
}
