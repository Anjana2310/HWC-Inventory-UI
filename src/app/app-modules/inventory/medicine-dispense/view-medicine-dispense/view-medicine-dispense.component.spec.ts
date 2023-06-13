import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicineDispenseComponent } from './view-medicine-dispense.component';

describe('ViewMedicineDispenseComponent', () => {
  let component: ViewMedicineDispenseComponent;
  let fixture: ComponentFixture<ViewMedicineDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedicineDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicineDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
