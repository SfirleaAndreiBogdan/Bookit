import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersManageComponent } from './offers-manage.component';

describe('OffersManageComponent', () => {
  let component: OffersManageComponent;
  let fixture: ComponentFixture<OffersManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
