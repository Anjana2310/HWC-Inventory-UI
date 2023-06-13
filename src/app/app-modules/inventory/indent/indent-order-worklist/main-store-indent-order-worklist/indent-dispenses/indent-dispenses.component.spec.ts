import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentDispensesComponent } from './indent-dispenses.component';

describe('IndentDispensesComponent', () => {
  let component: IndentDispensesComponent;
  let fixture: ComponentFixture<IndentDispensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentDispensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentDispensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
