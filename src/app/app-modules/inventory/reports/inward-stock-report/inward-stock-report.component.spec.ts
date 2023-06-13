import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardStockReportComponent } from './inward-stock-report.component';

describe('InwardStockReportComponent', () => {
  let component: InwardStockReportComponent;
  let fixture: ComponentFixture<InwardStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InwardStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
