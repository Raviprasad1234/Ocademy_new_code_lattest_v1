import { TestBed } from '@angular/core/testing';

import { CourseMakerHomeService } from './course-maker-home.service';

describe('CourseMakerHomeService', () => {
  let service: CourseMakerHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseMakerHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
