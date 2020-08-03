import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resumes-list',
  templateUrl: './resumes-list.component.html',
  styleUrls: ['./resumes-list.component.less']
})
export class ResumesListComponent implements OnInit {
  is_more:boolean = true; // 展开更多搜索条件

  validateForm!: FormGroup;

  search_text:string = '';

  loadingData:boolean = true;
  listOfData:any[] = [];

  list:any[] = []; // 当前页得数据

  constructor(
    private fb: FormBuilder
  ) {
    this.getDataList();
  }

  getDataList(total: number = 10) {
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.list = Array.from(new Array(total).keys());
      if(this.list.length !== 0) {
        this.listOfData = this.list.slice(0, 9);
      }
      // this.listOfData = [1, 2, 3];
    }, 800);
  }

  changeTab(status:string):void {
    console.log(status, 'change tabs, status changed!');
    const total:number = Math.ceil(Math.random() * 800);
    this.getDataList(total);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rangeDate: [null],
      work_address: [null],
      status: [null]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'validateForm');
  }

  resetForm(): void {
    this.validateForm.reset();
    this.search_text = '';
  }


  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
