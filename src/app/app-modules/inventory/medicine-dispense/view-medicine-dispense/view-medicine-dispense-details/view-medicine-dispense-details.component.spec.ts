import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicineDispenseDetailsComponent } from './view-medicine-dispense-details.component';

describe('ViewMedicineDispenseDetailsComponent', () => {
  let component: ViewMedicineDispenseDetailsComponent;
  let fixture: ComponentFixture<ViewMedicineDispenseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedicineDispenseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicineDispenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
