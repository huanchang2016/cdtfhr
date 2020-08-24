import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-resumes-download-list',
  templateUrl: './resumes-download-list.component.html',
  styleUrls: ['./resumes-download-list.component.less']
})
export class ResumesDownloadListComponent implements OnInit {

  is_more:boolean = false; // 展开更多搜索条件

  // search_text:string = '';

  // sort:'new' | 'refresh' = 'new';
  itemType:'simple' | 'card' = 'card';

  collectId:number;

  searchOption:{ [key:string]: any } = {
    sort: 'new',
    keywords: null,
    page_size: 15,
    page: 1
  };

  option:{ [key:string]: any } = {
    
  };

  type: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    // 获取当前的职位 id
    this.activatedRoute.params.subscribe((parmas:Params) => {
      this.collectId = +parmas['id'];
      this.option['collectId'] = this.collectId;
      console.log( 'this collectId', this.collectId)
      // 根据收藏夹 id 获取 各个 文件夹内 的简历列表
    })
  }

  ngOnInit(): void {
    
    console.log(this.type, 'this type', this.searchOption)
    // this.getDataList();
  }
  
  search():void { // 回车事件
    console.log('search text change', this.searchOption.keywords, this.searchOption);
    if(this.searchOption.keywords) {
      this.searchOption.keywords = this.searchOption.keywords.trim();
    }
    this.searchOptionConfig();
  }

  searchValueChange(option:any):void { // 更多 搜索条件发生变化
    console.log('more search option change', option);
    // 重置搜索条件时，分页数据应该重置 为  第一页
    this.searchOption.page = 1;
    this.searchOptionConfig(option);
  }

  pageOptionChanges({ pageSize, pageIndex }):void {
    this.searchOptionConfig({ page: pageIndex, page_size: pageSize });
  }

  searchOptionConfig(option:any = {}):void {
    const obj = Object.assign(this.searchOption, option);
    this.option = {...obj };
    this.getDataList();
  }

  sortValueChange():void {
    this.searchOptionConfig();
  }

  loadingData:boolean = false;
  dataOption:any = null;

  getDataList() {
    console.log('.... 获取简历列表', this.option);

    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.dataOption = {
        data: [
          { id: 1, name: '张三1' },
          { id: 2, name: '张三2' },
          { id: 3, name: '张三3' },
          { id: 4, name: '张三4' },
          { id: 5, name: '张三5' },
          { id: 6, name: '张三6' }
        ],
        meta: {
          pagination: {
            total: 200,
            per_page: 10,
            current_page: 1
          }
        }
      }
      console.log(this.dataOption, 'list')

      // this.refreshCheckedStatus();
    }, 2000);
  }


  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
