import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortExpiryReportComponent } from './short-expiry-report.component';

describe('ShortExpiryReportComponent', () => {
  let component: ShortExpiryReportComponent;
  let fixture: ComponentFixture<ShortExpiryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortExpiryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
