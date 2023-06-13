import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitReportComponent } from './transit-report.component';

describe('TransitReportComponent', () => {
  let component: TransitReportComponent;
  let fixture: ComponentFixture<TransitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
