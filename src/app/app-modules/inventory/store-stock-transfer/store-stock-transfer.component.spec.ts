import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStockTransferComponent } from './store-stock-transfer.component';

describe('StoreStockTransferComponent', () => {
  let component: StoreStockTransferComponent;
  let fixture: ComponentFixture<StoreStockTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreStockTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreStockTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
