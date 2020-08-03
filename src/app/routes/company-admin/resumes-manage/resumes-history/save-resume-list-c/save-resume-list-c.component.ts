import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-save-resume-list-c',
  templateUrl: './save-resume-list-c.component.html',
  styleUrls: ['./save-resume-list-c.component.less']
})
export class SaveResumeListCComponent implements OnChanges, OnInit {
  @Input() colsChange:boolean;
  
  loadingData:boolean = true;

  listOfData:any[] = [];

  constructor() { }

  ngOnChanges() {
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
          name: '产品经理-用户增长',
          resumes_count: 90,
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

    }, 1000);
  }
  
}
