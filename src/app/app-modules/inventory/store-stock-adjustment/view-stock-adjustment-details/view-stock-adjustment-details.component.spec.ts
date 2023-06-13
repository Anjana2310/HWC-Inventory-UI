import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockAdjustmentDetailsComponent } from './view-stock-adjustment-details.component';

describe('ViewStockAdjustmentDetailsComponent', () => {
  let component: ViewStockAdjustmentDetailsComponent;
  let fixture: ComponentFixture<ViewStockAdjustmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStockAdjustmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockAdjustmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
