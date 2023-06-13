import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryDrugIssueReportComponent } from './beneficiary-drug-issue-report.component';

describe('BeneficiaryDrugIssueReportComponent', () => {
  let component: BeneficiaryDrugIssueReportComponent;
  let fixture: ComponentFixture<BeneficiaryDrugIssueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryDrugIssueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryDrugIssueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
