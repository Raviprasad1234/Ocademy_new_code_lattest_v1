import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomeBodyComponent } from './main-home-body.component';

describe('MainHomeBodyComponent', () => {
  let component: MainHomeBodyComponent;
  let fixture: ComponentFixture<MainHomeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHomeBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
