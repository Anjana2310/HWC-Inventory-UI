import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxDashboardComponent } from './rx-dashboard.component';

describe('RxDashboardComponent', () => {
  let component: RxDashboardComponent;
  let fixture: ComponentFixture<RxDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
