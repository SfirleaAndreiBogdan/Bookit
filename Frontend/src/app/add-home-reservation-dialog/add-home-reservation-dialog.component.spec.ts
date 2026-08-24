import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeReservationDialogComponent } from './add-home-reservation-dialog.component';

describe('AddHomeReservationDialogComponent', () => {
  let component: AddHomeReservationDialogComponent;
  let fixture: ComponentFixture<AddHomeReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHomeReservationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHomeReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
