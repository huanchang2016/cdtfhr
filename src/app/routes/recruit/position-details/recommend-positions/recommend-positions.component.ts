import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-recommend-positions',
  templateUrl: './recommend-positions.component.html',
  styleUrls: ['./recommend-positions.component.less']
})
export class RecommendPositionsComponent implements OnChanges {
  @Input() positionId:number;

  list:any[] = [];

  loadingData:boolean = false; // 更新状态（换一批）

  requestLoading:boolean = false; // 投递状态
  

  constructor() { }

  ngOnChanges(): void {
    if(this.positionId) {
      this.getDataList();
    }
  }

  getDataList():void {
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.list = [
        {
          id: 1,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        },
        {
          id: 2,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        },
        {
          id: 3,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        },
        {
          id: 4,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        },
        {
          id: 5,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        },
        {
          id: 6,
          name: '产品经理-用户增长',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          logo: './assets/imgs/test/logo_company.png',
          company: { id: 11111, name: '成都天府新区人力资源开发服务有限公司' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          disabled: false
        }
      ];
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.requestLoading = false;
    }, 800);
  }

  updateList():void {
    this.getDataList();
  }
  
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId);
  }

  onCurrentPageDataChange(): void {
    //  翻页重新获取数据
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.list.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  selectedChange(checked:any, data:any) {
    console.log('checkbox change', checked, data);
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.list.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.requestLoading = true;
    const requestData = this.list.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: ', requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.requestLoading = false;
      // 重新获取 其他数据

    }, 1000);
  }
}
