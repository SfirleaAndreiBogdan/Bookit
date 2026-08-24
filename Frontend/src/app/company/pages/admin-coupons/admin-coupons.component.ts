import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.scss']
})
export class AdminCouponsComponent implements OnInit {
  users: any;
  couponForm: FormGroup;
  bookings:any;

  constructor(private companyService: CompanyService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.loadUsersAndBookings();

    this.couponForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]),
      discount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
      booking: new FormControl('', Validators.required),
    });
  }

  loadUsersAndBookings() {
    this.companyService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.companyService.getAllRoomsByUserId().subscribe((res)=>{
      this.bookings = res;
    })
  }

  createCoupon() {
    if (!this.couponForm.valid) {
      this.notification.error('Eroare', 'Valoarea sa nu fie negativa!');
      return;
    }

    if(this.couponForm.get('discount')?.value < 0){
      this.notification.error('Eroare', 'Valoarea sa nu fie negativa!');

      return;
    }

    const data = {
      userId: this.couponForm.get('userId')?.value,
      code: this.couponForm.get('code')?.value,
      discount: this.couponForm.get('discount')?.value,
      companyId: UserStorageService.getUserId(),
      roomId: this.couponForm.get('booking')?.value,
    };

    this.companyService.addCouponForUser(data).subscribe(
      (response) => {
        this.couponForm.reset();
      },
      (error) => {
      }
    );
  }

  blockNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

}
