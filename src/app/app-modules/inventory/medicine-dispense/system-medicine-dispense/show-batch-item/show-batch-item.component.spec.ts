import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBatchItemComponent } from './show-batch-item.component';

describe('ShowBatchItemComponent', () => {
  let component: ShowBatchItemComponent;
  let fixture: ComponentFixture<ShowBatchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBatchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
