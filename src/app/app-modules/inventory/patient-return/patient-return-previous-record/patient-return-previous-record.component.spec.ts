import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReturnPreviousRecordComponent } from './patient-return-previous-record.component';

describe('PatientReturnPreviousRecordComponent', () => {
  let component: PatientReturnPreviousRecordComponent;
  let fixture: ComponentFixture<PatientReturnPreviousRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReturnPreviousRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReturnPreviousRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
