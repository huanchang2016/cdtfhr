import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar-job-history',
  templateUrl: './right-sidebar-job-history.component.html',
  styleUrls: ['./right-sidebar-job-history.component.less']
})
export class RightSidebarJobHistoryComponent implements OnInit {
  loadingData: boolean = true;

  list: any[] = [];

  constructor() { }

  ngOnInit(): void {

    /***
     * 历史查看记录
     * 当前页面 需要登录后才可以访问
     * 
     * ****/
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
          peo_amount: { id: 11111, name: '500-2000人' }
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
          peo_amount: { id: 11111, name: '500-2000人' }
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
          peo_amount: { id: 11111, name: '500-2000人' }
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
          peo_amount: { id: 11111, name: '500-2000人' }
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
          peo_amount: { id: 11111, name: '500-2000人' }
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
          peo_amount: { id: 11111, name: '500-2000人' }
        }
      ];
    }, 1000);
  }

}
