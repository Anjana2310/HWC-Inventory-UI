import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryReportComponent } from './expiry-report.component';

describe('ExpiryReportComponent', () => {
  let component: ExpiryReportComponent;
  let fixture: ComponentFixture<ExpiryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
