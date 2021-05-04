import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerCertificationDesgnComponent } from './course-maker-certification-desgn.component';

describe('CourseMakerCertificationDesgnComponent', () => {
  let component: CourseMakerCertificationDesgnComponent;
  let fixture: ComponentFixture<CourseMakerCertificationDesgnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerCertificationDesgnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerCertificationDesgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
