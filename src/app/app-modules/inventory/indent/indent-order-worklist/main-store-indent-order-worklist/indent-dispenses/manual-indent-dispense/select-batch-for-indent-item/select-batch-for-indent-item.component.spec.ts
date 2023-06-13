import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBatchForIndentItemComponent } from './select-batch-for-indent-item.component';

describe('SelectBatchForIndentItemComponent', () => {
  let component: SelectBatchForIndentItemComponent;
  let fixture: ComponentFixture<SelectBatchForIndentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBatchForIndentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBatchForIndentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
