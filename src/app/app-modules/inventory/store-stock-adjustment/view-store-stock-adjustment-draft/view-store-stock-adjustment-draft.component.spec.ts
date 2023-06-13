import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreStockAdjustmentDraftComponent } from './view-store-stock-adjustment-draft.component';

describe('ViewStoreStockAdjustmentDraftComponent', () => {
  let component: ViewStoreStockAdjustmentDraftComponent;
  let fixture: ComponentFixture<ViewStoreStockAdjustmentDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreStockAdjustmentDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreStockAdjustmentDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
