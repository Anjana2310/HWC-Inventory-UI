import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryDetailsComponent } from './benificiary-details.component';

describe('BenificiaryDetailsComponent', () => {
  let component: BenificiaryDetailsComponent;
  let fixture: ComponentFixture<BenificiaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenificiaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenificiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
