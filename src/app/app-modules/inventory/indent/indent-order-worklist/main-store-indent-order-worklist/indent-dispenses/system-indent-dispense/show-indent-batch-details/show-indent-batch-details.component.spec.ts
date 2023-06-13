import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIndentBatchDetailsComponent } from './show-indent-batch-details.component';

describe('ShowIndentBatchDetailsComponent', () => {
  let component: ShowIndentBatchDetailsComponent;
  let fixture: ComponentFixture<ShowIndentBatchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIndentBatchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIndentBatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
