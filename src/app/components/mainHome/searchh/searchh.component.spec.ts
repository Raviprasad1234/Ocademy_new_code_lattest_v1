import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchhComponent } from './searchh.component';

describe('SearchhComponent', () => {
  let component: SearchhComponent;
  let fixture: ComponentFixture<SearchhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
