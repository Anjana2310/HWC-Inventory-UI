import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreStockAdjustmentComponent } from './view-store-stock-adjustment.component';

describe('ViewStoreStockAdjustmentComponent', () => {
  let component: ViewStoreStockAdjustmentComponent;
  let fixture: ComponentFixture<ViewStoreStockAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreStockAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreStockAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
