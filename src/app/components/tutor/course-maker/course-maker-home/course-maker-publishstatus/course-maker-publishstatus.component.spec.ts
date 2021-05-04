import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerPublishstatusComponent } from './course-maker-publishstatus.component';

describe('CourseMakerPublishstatusComponent', () => {
  let component: CourseMakerPublishstatusComponent;
  let fixture: ComponentFixture<CourseMakerPublishstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerPublishstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerPublishstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
