import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerVideoComponent } from './course-maker-video.component';

describe('CourseMakerVideoComponent', () => {
  let component: CourseMakerVideoComponent;
  let fixture: ComponentFixture<CourseMakerVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
