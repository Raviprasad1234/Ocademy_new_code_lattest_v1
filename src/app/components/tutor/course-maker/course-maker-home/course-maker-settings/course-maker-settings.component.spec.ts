import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMakerSettingsComponent } from './course-maker-settings.component';

describe('CourseMakerSettingsComponent', () => {
  let component: CourseMakerSettingsComponent;
  let fixture: ComponentFixture<CourseMakerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMakerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMakerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
