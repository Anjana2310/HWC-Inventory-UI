import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAdjustmentComponent } from './batch-adjustment.component';

describe('BatchAdjustmentComponent', () => {
  let component: BatchAdjustmentComponent;
  let fixture: ComponentFixture<BatchAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
