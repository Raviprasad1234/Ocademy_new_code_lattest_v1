import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountSettingsComponent } from './student-account-settings.component';

describe('StudentAccountSettingsComponent', () => {
  let component: StudentAccountSettingsComponent;
  let fixture: ComponentFixture<StudentAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAccountSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
