import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStockSummaryReportComponent } from './daily-stock-summary-report.component';

describe('DailyStockSummaryReportComponent', () => {
  let component: DailyStockSummaryReportComponent;
  let fixture: ComponentFixture<DailyStockSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStockSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStockSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
