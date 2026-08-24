import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedBookingComponent } from './updated-booking.component';

describe('UpdatedBookingComponent', () => {
  let component: UpdatedBookingComponent;
  let fixture: ComponentFixture<UpdatedBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatedBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
