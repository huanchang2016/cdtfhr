import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar-advert',
  templateUrl: './right-sidebar-advert.component.html',
  styleUrls: ['./right-sidebar-advert.component.less']
})
export class RightSidebarAdvertComponent implements OnInit {

  loadingData:boolean = true;
  list:any[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingData = false;
      this.list = [
        {
          id: 1,
          title: '菁英网 好平台 新机遇',
          sub_title: '提高收入，你值得更好的',
          thumb: './assets/imgs/test/img_adv2.png',
          link: '/entrance'
        },
        {
          id: 2,
          title: '有灵魂 有本事 有血性 有品德',
          sub_title: '四有军人，热血报国',
          thumb: './assets/imgs/test/img_adv1.png',
          link: '/passport/register/company'
        }
      ];
    }, 1000);
  }

}
