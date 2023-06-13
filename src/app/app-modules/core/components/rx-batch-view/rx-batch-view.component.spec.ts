import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxBatchViewComponent } from './rx-batch-view.component';

describe('RxBatchViewComponent', () => {
  let component: RxBatchViewComponent;
  let fixture: ComponentFixture<RxBatchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxBatchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxBatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
