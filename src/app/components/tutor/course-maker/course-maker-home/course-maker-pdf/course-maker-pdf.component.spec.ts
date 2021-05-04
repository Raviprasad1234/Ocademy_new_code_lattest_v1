import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerPdfComponent } from './course-maker-pdf.component';

describe('CourseMakerPdfComponent', () => {
  let component: CourseMakerPdfComponent;
  let fixture: ComponentFixture<CourseMakerPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
