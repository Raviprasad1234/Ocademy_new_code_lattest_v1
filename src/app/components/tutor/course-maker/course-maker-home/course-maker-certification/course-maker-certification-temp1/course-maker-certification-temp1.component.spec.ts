import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerCertificationTemp1Component } from './course-maker-certification-temp1.component';

describe('CourseMakerCertificationTemp1Component', () => {
  let component: CourseMakerCertificationTemp1Component;
  let fixture: ComponentFixture<CourseMakerCertificationTemp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerCertificationTemp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerCertificationTemp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
