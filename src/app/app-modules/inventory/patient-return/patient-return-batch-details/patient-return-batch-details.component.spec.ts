import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReturnBatchDetailsComponent } from './patient-return-batch-details.component';

describe('PatientReturnBatchDetailsComponent', () => {
  let component: PatientReturnBatchDetailsComponent;
  let fixture: ComponentFixture<PatientReturnBatchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReturnBatchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReturnBatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
