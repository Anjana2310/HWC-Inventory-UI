import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBatchDetailsForPatientReturnComponent } from './item-batch-details-for-patient-return.component';

describe('ItemBatchDetailsForPatientReturnComponent', () => {
  let component: ItemBatchDetailsForPatientReturnComponent;
  let fixture: ComponentFixture<ItemBatchDetailsForPatientReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBatchDetailsForPatientReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBatchDetailsForPatientReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
