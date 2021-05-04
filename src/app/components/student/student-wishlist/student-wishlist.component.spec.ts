import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWishlistComponent } from './student-wishlist.component';

describe('StudentWishlistComponent', () => {
  let component: StudentWishlistComponent;
  let fixture: ComponentFixture<StudentWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
