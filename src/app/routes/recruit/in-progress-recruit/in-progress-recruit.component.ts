import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-progress-recruit',
  templateUrl: './in-progress-recruit.component.html',
  styleUrls: ['./in-progress-recruit.component.less']
})
export class InProgressRecruitComponent implements OnInit {

  list: any[] = []; // 数据列表
  loadingData: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList():void {
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
        },

        {
          id: 7,
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
          id: 8,
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
          id: 9,
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
          id: 10,
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
          id: 11,
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
          id: 12,
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
    }, 800);
  }


  checked = false;
  loading = false;
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
    this.loading = true;
    const requestData = this.list.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: ', requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }
}
