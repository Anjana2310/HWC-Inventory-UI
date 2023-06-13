import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadStoreDetailsComponent } from './load-store-details.component';

describe('LoadStoreDetailsComponent', () => {
  let component: LoadStoreDetailsComponent;
  let fixture: ComponentFixture<LoadStoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadStoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
