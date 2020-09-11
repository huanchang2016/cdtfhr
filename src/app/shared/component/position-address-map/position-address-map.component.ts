import { Component, OnChanges, Input, OnInit } from '@angular/core';

declare var BMap: any;

@Component({
  selector: 'app-position-address-map',
  templateUrl: './position-address-map.component.html',
  styleUrls: ['./position-address-map.component.less']
})
export class PositionAddressMapComponent implements OnChanges, OnInit {
  @Input() city:string = '成都市';
  @Input() address:string;

  constructor() { }

  ngOnChanges(): void {
    if(this.address) {
      console.log('show map address', this.address);
    }
  }

  ngOnInit() {
    const map = new BMap.Map('map');//创建地图实例
    const point = new BMap.Point(116.404, 39.915);//创建点坐标
    // map.centerAndZoom(point, 15);//初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());

    const myGeo = new BMap.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(this.address, (point:any) => {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));

            const opts = {
              width : 250,     // 信息窗口宽度    
              // height: 100,     // 信息窗口高度    
              title : "工作地址"  // 信息窗口标题   
          }
          const infoWindow = new BMap.InfoWindow(this.address, opts);  // 创建信息窗口对象 
          map.openInfoWindow(infoWindow, map.getCenter());
        }
    }, this.city);
  }

}
