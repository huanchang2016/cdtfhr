import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-user-admin-work-exp',
  templateUrl: './user-admin-work-exp.component.html',
  styleUrls: ['./user-admin-work-exp.component.less']
})
export class UserAdminWorkExpComponent implements OnInit {
  @Output() stepsChange:EventEmitter<any> = new EventEmitter();

  workOptions:any = {};

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
          if(!this.workOptions[item]) {
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
    this.isSubmitCheck = false;
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
      delete this.workOptions[item];
      console.log(this.workOptions, 'deleted eduOptions');
    }
  }

  cancel() {}

  formValidChange({index, form}) {
    if(form.valid) {
      
      this.workOptions[index] = form.value;
      console.log(this.workOptions, 'valid eduOptions');
    }
  }

  submitForm(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.workOptions);
    });
    
  }

}