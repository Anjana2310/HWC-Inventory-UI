import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPrintComponent } from './dynamic-print.component';

describe('DynamicPrintComponent', () => {
  let component: DynamicPrintComponent;
  let fixture: ComponentFixture<DynamicPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
