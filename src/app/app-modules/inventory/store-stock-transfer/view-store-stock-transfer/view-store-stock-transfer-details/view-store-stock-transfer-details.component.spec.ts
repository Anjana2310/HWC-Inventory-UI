import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreStockTransferDetailsComponent } from './view-store-stock-transfer-details.component';

describe('ViewStoreStockTransferDetailsComponent', () => {
  let component: ViewStoreStockTransferDetailsComponent;
  let fixture: ComponentFixture<ViewStoreStockTransferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreStockTransferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreStockTransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
