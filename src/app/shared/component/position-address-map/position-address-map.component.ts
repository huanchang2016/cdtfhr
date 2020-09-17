import { Component, Input, OnInit } from '@angular/core';

declare var BMap: any;

@Component({
  selector: 'app-position-address-map',
  templateUrl: './position-address-map.component.html',
  styleUrls: ['./position-address-map.component.less']
})
export class PositionAddressMapComponent implements OnInit {
  @Input() city?: string = '成都市';
  @Input() address: string;

  constructor() { }

  ngOnInit() {
    if (this.address) {
      const map = new BMap.Map('map');//创建地图实例
      // const point = new BMap.Point(116.404, 39.915);//创建点坐标
      // map.centerAndZoom(point, 15);//初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl());

      const myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野    
      myGeo.getPoint(this.address, (point: any) => {
        console.log(point, 'point')
        if (point) {
          map.centerAndZoom(point, 11);
	
          let marker = new BMap.Marker(point);  // 创建标注

          map.addOverlay(marker);              // 将标注添加到地图中
          const opts = {
            width: 250,     // 信息窗口宽度    
            // height: 300,     // 信息窗口高度    
            // title : "工作地址"  // 信息窗口标题   
          }
          const infoWindow = new BMap.InfoWindow(this.address, opts);  // 创建信息窗口对象 

          map.openInfoWindow(infoWindow, map.getCenter());

          marker.addEventListener("click", function(){          
            map.openInfoWindow(infoWindow, point); //开启信息窗口
          }); 
        }
      }, this.city);
    }
  }

}
