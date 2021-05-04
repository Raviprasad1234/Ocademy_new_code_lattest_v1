import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorReportsComponent } from './tutor-reports.component';

describe('TutorReportsComponent', () => {
  let component: TutorReportsComponent;
  let fixture: ComponentFixture<TutorReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
