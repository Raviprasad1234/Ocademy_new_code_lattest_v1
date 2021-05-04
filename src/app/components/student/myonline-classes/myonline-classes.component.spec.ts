import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyonlineClassesComponent } from './myonline-classes.component';

describe('MyonlineClassesComponent', () => {
  let component: MyonlineClassesComponent;
  let fixture: ComponentFixture<MyonlineClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyonlineClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyonlineClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
