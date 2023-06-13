import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStockAdjustmentComponent } from './store-stock-adjustment.component';

describe('StoreStockAdjustmentComponent', () => {
  let component: StoreStockAdjustmentComponent;
  let fixture: ComponentFixture<StoreStockAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreStockAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreStockAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
