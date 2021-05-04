import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerAddSectionComponent } from './course-maker-add-section.component';

describe('CourseMakerAddSectionComponent', () => {
  let component: CourseMakerAddSectionComponent;
  let fixture: ComponentFixture<CourseMakerAddSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerAddSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
