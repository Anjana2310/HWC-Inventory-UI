import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRequestComponent } from './indent-request.component';

describe('IndentRequestComponent', () => {
  let component: IndentRequestComponent;
  let fixture: ComponentFixture<IndentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
