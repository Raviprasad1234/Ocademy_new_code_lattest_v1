import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomeHeaderComponent } from './main-home-header.component';

describe('MainHomeHeaderComponent', () => {
  let component: MainHomeHeaderComponent;
  let fixture: ComponentFixture<MainHomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHomeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
