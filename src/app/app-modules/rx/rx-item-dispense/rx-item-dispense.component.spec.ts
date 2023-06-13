import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxItemDispenseComponent } from './rx-item-dispense.component';

describe('RxItemDispenseComponent', () => {
  let component: RxItemDispenseComponent;
  let fixture: ComponentFixture<RxItemDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxItemDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxItemDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
