import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RouteRoutingModule } from './routes-routing.module';

import { HomePageComponent } from './home-page/home-page.component';
import { CarouselIndexComponent } from './home-page/carousel-index/carousel-index.component';
import { HotRecuritCarouselComponent } from './home-page/hot-recurit-carousel/hot-recurit-carousel.component';
import { IngRecuritCarouselComponent } from './home-page/ing-recurit-carousel/ing-recurit-carousel.component';
import { FriendlyLinkComponent } from './home-page/friendly-link/friendly-link.component';

const COMPONENTS = [
  HomePageComponent
  // single pages
  // UserLockComponent,
];
const COMPONENTS_NOROUNT = [
  // 首页子组件
  CarouselIndexComponent,
  HotRecuritCarouselComponent,
  IngRecuritCarouselComponent,
  FriendlyLinkComponent
];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class RoutesModule {}
