import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDispenseComponent } from './medicine-dispense.component';

describe('MedicineDispenseComponent', () => {
  let component: MedicineDispenseComponent;
  let fixture: ComponentFixture<MedicineDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
