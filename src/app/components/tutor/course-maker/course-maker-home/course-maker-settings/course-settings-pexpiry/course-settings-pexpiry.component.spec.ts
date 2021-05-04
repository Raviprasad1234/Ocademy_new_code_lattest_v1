import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSettingsPexpiryComponent } from './course-settings-pexpiry.component';

describe('CourseSettingsPexpiryComponent', () => {
  let component: CourseSettingsPexpiryComponent;
  let fixture: ComponentFixture<CourseSettingsPexpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSettingsPexpiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSettingsPexpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
