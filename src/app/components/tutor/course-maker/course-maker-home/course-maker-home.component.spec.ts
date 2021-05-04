import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerHomeComponent } from './course-maker-home.component';

describe('CourseMakerHomeComponent', () => {
  let component: CourseMakerHomeComponent;
  let fixture: ComponentFixture<CourseMakerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
