import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualIndentDispenseComponent } from './manual-indent-dispense.component';

describe('ManualIndentDispenseComponent', () => {
  let component: ManualIndentDispenseComponent;
  let fixture: ComponentFixture<ManualIndentDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualIndentDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualIndentDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
