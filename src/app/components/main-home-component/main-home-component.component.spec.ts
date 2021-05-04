import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomeComponentComponent } from './main-home-component.component';

describe('MainHomeComponentComponent', () => {
  let component: MainHomeComponentComponent;
  let fixture: ComponentFixture<MainHomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHomeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
