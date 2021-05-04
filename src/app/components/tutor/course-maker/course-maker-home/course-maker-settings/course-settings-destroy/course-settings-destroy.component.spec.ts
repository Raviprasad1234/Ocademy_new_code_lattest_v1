import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSettingsDestroyComponent } from './course-settings-destroy.component';

describe('CourseSettingsDestroyComponent', () => {
  let component: CourseSettingsDestroyComponent;
  let fixture: ComponentFixture<CourseSettingsDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSettingsDestroyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSettingsDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
