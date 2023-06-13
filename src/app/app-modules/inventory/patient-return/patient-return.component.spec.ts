import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReturnComponent } from './patient-return.component';

describe('PatientReturnComponent', () => {
  let component: PatientReturnComponent;
  let fixture: ComponentFixture<PatientReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
