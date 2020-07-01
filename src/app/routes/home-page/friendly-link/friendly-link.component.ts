import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendly-link',
  templateUrl: './friendly-link.component.html',
  styleUrls: ['./friendly-link.component.less']
})
export class FriendlyLinkComponent implements OnInit {
  
  links:any[] = [
    {id: 1, name: '四川天府新区成都片区官方网站'},
    {id: 1, name: '成都天府新区投资集团有限公司'},
    {id: 1, name: '四川日报招标比选网'},
    {id: 1, name: '成都金控人力'},
    {id: 1, name: '双流人才网'},
    {id: 1, name: '温江人才网'},
    {id: 1, name: '四川人才网'},
    {id: 1, name: '四川在线'},
    {id: 1, name: '产业园区招商'},
    {id: 1, name: '597人才网'},
    {id: 1, name: '成都人才招聘'},
    {id: 1, name: '天府招聘'},
    {id: 1, name: '中国政府网'},
    {id: 1, name: '成都市人力资源和社会保障局'},
    {id: 1, name: '四川人事考试网'},
    {id: 1, name: '中国高等教育学生信息网（学信网）'},
    {id: 1, name: '优越人才网'},
    {id: 1, name: '国家企业信用信息公示系统'},
    {id: 1, name: '中国人力资源市场网'},
    {id: 1, name: '天府新区公共就业服务网'},
    {id: 1, name: '成都招聘网'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
