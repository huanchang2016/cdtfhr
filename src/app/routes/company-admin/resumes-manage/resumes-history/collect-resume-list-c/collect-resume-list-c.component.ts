import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-collect-resume-list-c',
  templateUrl: './collect-resume-list-c.component.html',
  styleUrls: ['./collect-resume-list-c.component.less']
})
export class CollectResumeListCComponent implements OnChanges, OnInit {
  @Input() colsChange:boolean;
  
  loadingData:boolean = true;

  listOfData:any[] = [];

  constructor() { }

  ngOnChanges() {
    console.log('onchanges ');
    
    if(this.listOfData.length !== 0) {
      console.log('cols changes', this.colsChange);
    }
  }

  ngOnInit(): void {
    console.log('collect list c');
    this.getDataList();
  }
  getDataList():void {
    this.loadingData = true;
    const total = Math.ceil(Math.random() * 200);
    setTimeout(() => {
      this.loadingData = false;

      this.listOfData = Array.from(new Array(total).keys()).map( v => {
        return {
          id: v + 1,
          username: '产品经理-用户增长',
          resumes_count: 90,
          sex: { id: 1, name: '男' },
          work_date: '6年',
          age: 29,
          school: '成都天府新区人才学院',
          major: '内训讲师',
          address: '',
          start_time: '2020-07-22 11:24:23',
          end_time: '2020-09-22 12:00:00',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          status: Math.random() > 0.5
        }
      });
      // username
      // sex
      // work_date
      // age
      // school
      // major
      // address
      // intention_address
      // td_time
      // status

    }, 1000);
  }
  
}
