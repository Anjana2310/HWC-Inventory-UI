import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStockDetailsReportComponent } from './daily-stock-details-report.component';

describe('DailyStockDetailsReportComponent', () => {
  let component: DailyStockDetailsReportComponent;
  let fixture: ComponentFixture<DailyStockDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStockDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStockDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
