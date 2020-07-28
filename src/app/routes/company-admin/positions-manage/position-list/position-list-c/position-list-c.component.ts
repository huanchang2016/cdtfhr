import { Component, OnInit, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PositionFormComponent } from '../position-form/position-form.component';

@Component({
  selector: 'app-position-list-c',
  templateUrl: './position-list-c.component.html',
  styleUrls: ['./position-list-c.component.less']
})
export class PositionListCComponent implements OnChanges {
  @Input() listOfData:any[] = [];
  @Input() status:string;

  freshLoadingOption:{[key:number]: boolean} = {};

  confirmModal?: NzModalRef; // For testing by now
  
  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(): void {
    if(this.listOfData && this.listOfData.length !== 0) {
      console.log('listOfData', this.listOfData);
      this.listOfData.forEach(item => {
        this.freshLoadingOption[item.id] = false;
      })
    }
    
  }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData:any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId);
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    //  翻页重新获取数据
    this.refreshCheckedStatus();
  }


  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  selectedChange(checked:any, data:any) {
    console.log('checkbox change', checked, data);
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  refreshItem(data:any):void {
    // 刷新职位
    this.freshLoadingOption[data.id] = true;
    setTimeout(() => {
      this.freshLoadingOption[data.id] = false;
    }, 500);
  }

  underLineSubmit() {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: 全部下线', requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
      // 重新获取 其他数据
      
    }, 1000);
  }

  upLineSubmit() {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: 全部上线', requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
      // 重新获取 其他数据
      
    }, 1000);
  }

  edit(data:any): void {
    console.log('create position');
    const modal = this.modal.create({
      nzTitle: '修改职位信息',
      nzContent: PositionFormComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });

  }


  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '是否将此招聘信息删除？',
      nzContent: '删除后，职位下对应接收的简历也会被删除。加入收藏夹的除外',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),
      nzOnCancel: () => {}
    });
  }

  disabled(id:number):void {
    console.log('下线职位 id', id);
    this.listOfData = this.listOfData.filter(v => v.id !== id);
  }

  disabledAll():void {
    console.log('批量下线职位');
  }

  cancel():void {}
}
