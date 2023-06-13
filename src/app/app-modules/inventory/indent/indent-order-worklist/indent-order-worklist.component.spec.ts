import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentOrderWorklistComponent } from './indent-order-worklist.component';

describe('IndentOrderWorklistComponent', () => {
  let component: IndentOrderWorklistComponent;
  let fixture: ComponentFixture<IndentOrderWorklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentOrderWorklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentOrderWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
