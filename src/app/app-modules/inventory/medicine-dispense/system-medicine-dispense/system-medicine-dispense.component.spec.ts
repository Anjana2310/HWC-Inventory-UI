import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMedicineDispenseComponent } from './system-medicine-dispense.component';

describe('SystemMedicineDispenseComponent', () => {
  let component: SystemMedicineDispenseComponent;
  let fixture: ComponentFixture<SystemMedicineDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMedicineDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMedicineDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
