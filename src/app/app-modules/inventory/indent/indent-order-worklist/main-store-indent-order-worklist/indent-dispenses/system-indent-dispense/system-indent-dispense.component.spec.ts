import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIndentDispenseComponent } from './system-indent-dispense.component';

describe('SystemIndentDispenseComponent', () => {
  let component: SystemIndentDispenseComponent;
  let fixture: ComponentFixture<SystemIndentDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemIndentDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemIndentDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
