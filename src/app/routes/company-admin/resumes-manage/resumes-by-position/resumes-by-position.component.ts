import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resumes-by-position',
  templateUrl: './resumes-by-position.component.html',
  styleUrls: ['./resumes-by-position.component.less']
})
export class ResumesByPositionComponent implements OnInit {

  is_more:boolean = false; // 展开更多搜索条件

  search_text:string = '';

  itemType:'simple' | 'card' = 'card';

  searchOption:{ [key:string]: any } = {
    resume_status: '待处理'
  };

  constructor(
    // private cd: ChangeDetectorRef
  ) {
    // this.getDataList();
  }

  ngOnInit(): void {
    
  }

  // ngAfterViewInit() {
    // console.log('cd .....')
    // this.cd.detectChanges();
  // }
  
  
  search():void { // 回车事件
    console.log('search text change', this.search_text, this.searchOption);
    const keywords:string = this.search_text ? this.search_text.trim() : null;
    if(this.searchOption.keywords) {
      if(keywords === this.searchOption.keywords) {
        return;
      }
    }
    this.searchOptionConfig({ keywords: keywords });
  }

  searchValueChange(option:any):void { // 更多 搜索条件发生变化
    console.log('more search option change', option, 'search_text', this.search_text);
    this.searchOptionConfig(option);
  }


  selectChange(status:string):void {
    console.log(status, 'change tabs, status changed!');
    this.searchOptionConfig({ resume_status: status });
  }

  option:any = {};
  searchOptionConfig(option:any = {}):void {
    const obj = Object.assign(this.searchOption, option);
    this.option = {...obj};
    console.log('....', this.option, option);
  }


  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
