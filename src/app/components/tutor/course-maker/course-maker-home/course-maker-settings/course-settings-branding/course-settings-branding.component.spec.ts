import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSettingsBrandingComponent } from './course-settings-branding.component';

describe('CourseSettingsBrandingComponent', () => {
  let component: CourseSettingsBrandingComponent;
  let fixture: ComponentFixture<CourseSettingsBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSettingsBrandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSettingsBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
