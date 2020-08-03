import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-resumes-list-cols-c',
  templateUrl: './resumes-list-cols-c.component.html',
  styleUrls: ['./resumes-list-cols-c.component.less']
})
export class ResumesListColsCComponent implements OnInit {
  @Input() data:any;

  styleOption:any = { width: '300px', height: '400px', 'text-align': 'left' };

  list: TransferItem[] = [
    { key: 'username', title: `姓名`, description: `用户姓名全称`, direction: 'left' },
    { key: 'sex', title: `性别`, description: `用户性别`, direction: 'left' },
    { key: 'work_date', title: `工作时间`, description: `工作初始时间`, direction: 'left' },
    { key: 'age', title: `年龄`, description: `年龄`, direction: 'left' },
    { key: 'school', title: `学校`, description: `最高学历就读学校`, direction: 'left' },
    { key: 'major', title: `专业`, description: `最高学历专业`, direction: 'left' },
    { key: 'address', title: `现居住地`, description: `现居住地址`, direction: 'left' },
    { key: 'intention_address', title: `期望工作地`, description: `期望工作地址`, direction: 'left' },
    { key: 'td_time', title: `投递时间`, description: `职位简历投递时间`, direction: 'left' },
    { key: 'status', title: `求职状态`, description: `当前求职者的工作状态`, direction: 'left' }
  ];

  constructor(
    private settingService: GlobalSettingsService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    if(this.settingService.get('col_select')) {
      let selects:any[] = this.settingService.getItem('col_select');
      this.list = this.list.map( v => {

        let dir = { direction: 'left' };
        if(this.hasCol(v.key, selects)) {
          dir = { direction: 'right' };
        }
        return Object.assign(v, dir);
      })
    }
    console.log(this.list);
  }

  hasCol(key:string, data:any[]):boolean {
    const items:any[] = data.filter( v => v.key === key);
    return items.length > 0;
  }

  // tslint:disable-next-line:no-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  // change(ret: {}): void {
  //   console.log('nzChange', ret);
  // }

  save():void {
    console.log(this.list, 'save');
    const selects:any[] = this.list.filter(v => v.direction === 'right');
    console.log('selectes : ', selects);
    this.settingService.setItem('col_select', selects);
    setTimeout(() => {
      this.destroyModal({ save: true })
    }, 300);
  }

  cancel():void {
    this.destroyModal();
  }

  destroyModal(data:any = null): void {
    this.modal.destroy({ data: data });
  }
}
