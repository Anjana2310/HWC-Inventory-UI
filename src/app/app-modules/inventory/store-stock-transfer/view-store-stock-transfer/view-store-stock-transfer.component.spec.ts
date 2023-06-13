import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreStockTransferComponent } from './view-store-stock-transfer.component';

describe('ViewStoreStockTranferComponent', () => {
  let component: ViewStoreStockTransferComponent;
  let fixture: ComponentFixture<ViewStoreStockTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreStockTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreStockTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
