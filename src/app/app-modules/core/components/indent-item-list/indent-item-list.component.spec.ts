import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentItemListComponent } from './indent-item-list.component';

describe('IndentItemListComponent', () => {
  let component: IndentItemListComponent;
  let fixture: ComponentFixture<IndentItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
