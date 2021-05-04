import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCommunicationComponent } from './tutor-communication.component';

describe('TutorCommunicationComponent', () => {
  let component: TutorCommunicationComponent;
  let fixture: ComponentFixture<TutorCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
