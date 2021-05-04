import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerCertificationComponent } from './course-maker-certification.component';

describe('CourseMakerCertificationComponent', () => {
  let component: CourseMakerCertificationComponent;
  let fixture: ComponentFixture<CourseMakerCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
