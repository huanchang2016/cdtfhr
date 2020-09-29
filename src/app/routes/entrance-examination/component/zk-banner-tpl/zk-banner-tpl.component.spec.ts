import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkBannerTplComponent } from './zk-banner-tpl.component';

describe('ZkBannerTplComponent', () => {
  let component: ZkBannerTplComponent;
  let fixture: ComponentFixture<ZkBannerTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZkBannerTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZkBannerTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
