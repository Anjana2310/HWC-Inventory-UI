import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockAdjustmentDraftDetailsComponent } from './view-stock-adjustment-draft-details.component';

describe('ViewStockAdjustmentDraftDetailsComponent', () => {
  let component: ViewStockAdjustmentDraftDetailsComponent;
  let fixture: ComponentFixture<ViewStockAdjustmentDraftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStockAdjustmentDraftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockAdjustmentDraftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
