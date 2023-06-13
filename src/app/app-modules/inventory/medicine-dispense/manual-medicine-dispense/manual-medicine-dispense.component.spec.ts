import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMedicineDispenseComponent } from './manual-medicine-dispense.component';

describe('ManualMedicineDispenseComponent', () => {
  let component: ManualMedicineDispenseComponent;
  let fixture: ComponentFixture<ManualMedicineDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualMedicineDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualMedicineDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
