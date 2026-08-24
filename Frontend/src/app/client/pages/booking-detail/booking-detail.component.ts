import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { format } from 'date-fns';
import { TranslationService } from '../../../components/language-switcher/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss'
})
export class BookingDetailComponent implements OnInit {
  roomId: any;
  imagePrivide: string[] = [];
  room: any;
  reviews: any;
  userCoupons: any[] = [];
  originalPrice: number;
  finalPrice: number;
  reservedDates;
  validateForm!: FormGroup;
  filteredCoupons = [];
  isLoading: boolean = true;
  facilitiesIcons;

  private isLoadingDetails = false;
  private isLoadingReservations = false;
  private isLoadingCoupons = false;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      dateRange: [null, Validators.required],
      couponDetails: [null]
    });

    this.roomId = this.activatedRoute.snapshot.params['id'];

    this.validateForm.get('dateRange')!.valueChanges.subscribe(() => this.calculatePrice());

    this.resetState();

    this.loadData();
  }

  get isBrowser(): boolean {
  return isPlatformBrowser(this.platformId);
  } 

  resetState() {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.room = null;
    this.imagePrivide = [];
    this.reviews = [];
    this.userCoupons = [];
    this.originalPrice = 0;
    this.finalPrice = 0;
    this.reservedDates = [];
    this.filteredCoupons = [];
    this.isLoading = true;
    this.isLoadingDetails = false;
    this.isLoadingReservations = false;
    this.isLoadingCoupons = false;
    this.facilitiesIcons = null;
  }

  loadData() {
    this.getBookingDetails();
    this.getbookingReservationList();

    if (UserStorageService.getUserId()) {
      this.loadCoupons();
    } else {
      this.isLoadingCoupons = true;
      this.checkLoadingComplete();
    }
}


  loadCoupons() {
    this.clientService.getUserCoupons(UserStorageService.getUserId()).subscribe((res) => {
      this.userCoupons = res ?? [];
      this.filteredCoupons = this.userCoupons.filter(coupon => !coupon.used);
      this.isLoadingCoupons = true;
      this.checkLoadingComplete();
    });
  }

  getBookingDetails() {
    this.clientService.getDetailsById(this.roomId).subscribe((res) => {
      this.imagePrivide = res.roomDetails.imgUrls.map(img =>
        img.startsWith('data:image') ? img : `data:image/jpeg;base64,${img}`
      );
      this.room = res.roomDetails;
      this.originalPrice = res.roomDetails.price;
      this.reviews = res.reviewDto;
      this.facilitiesIcons = res.roomDetails.facilityDetails;
      this.calculatePrice();

      this.isLoadingDetails = true;
      this.checkLoadingComplete();
    });
  }

  getbookingReservationList() {
    this.clientService.getReservationByRoomId(this.roomId).subscribe((res) => {
      const validReservations = res.filter((reservation: any) => reservation.reservationStatus !== 'CANCELED');

      this.reservedDates = validReservations.map((reservation: any) => {
        const start = reservation.offerDetails
          ? new Date(reservation.offerDetails.startDate)
          : new Date(reservation.startDate);
        const end = reservation.offerDetails
          ? new Date(reservation.offerDetails.endDate)
          : new Date(reservation.endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        return { startDate: start, endDate: end };
      });

      this.isLoadingReservations = true;
      this.checkLoadingComplete();
    });
  }

  checkLoadingComplete() {
    if (this.isLoadingDetails && this.isLoadingReservations && this.isLoadingCoupons) {
      this.isLoading = false;
    }
  }

  disabledDate = (current: Date): boolean => {
    if (!this.reservedDates) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const normalizedCurrent = new Date(current);
    normalizedCurrent.setHours(0, 0, 0, 0);

    if (normalizedCurrent <= today) return true;

    for (const { startDate, endDate } of this.reservedDates) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);

      if (normalizedCurrent >= start && normalizedCurrent <= end) {
        return true;
      }
    }

    return false;
  };

  calculatePrice() {
  if (!this.room || !this.room.price) {
    return;
  }

  const dateArray = this.validateForm.get('dateRange')!.value;
  const selectedCoupon = this.validateForm.get('couponDetails')?.value;

  if (!dateArray || dateArray.length !== 2) {
    this.finalPrice = this.originalPrice;
    return;
  }

  const startDate = new Date(dateArray[0]);
  const endDate = new Date(dateArray[1]);
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  let totalPrice = this.originalPrice * nights;

  let coupon = selectedCoupon;

  if (!coupon && this.room.couponDetails) {
    coupon = this.room.couponDetails;
  }

  if (coupon && coupon.discount) {
    totalPrice -= totalPrice * (coupon.discount / 100);
  }

  this.finalPrice = totalPrice;
}


  bookService() {
    const dateArray = this.validateForm.get('dateRange')!.value;

    if (!dateArray || dateArray.length !== 2) {
      this.notification.error('ERROR', 'Please select a valid date range!', { nzDuration: 5000 });
      return;
    }

    const selectedStart = new Date(dateArray[0]);
    const selectedEnd = new Date(dateArray[1]);
    selectedStart.setHours(0, 0, 0, 0);
    selectedEnd.setHours(0, 0, 0, 0);

    const overlaps = this.reservedDates.some((res: any) => {
      const resStart = new Date(res.startDate);
      const resEnd = new Date(res.endDate);
      resStart.setHours(0, 0, 0, 0);
      resEnd.setHours(0, 0, 0, 0);

      return !(selectedEnd < resStart || selectedStart > resEnd);
    });

    if (overlaps) {
      const errorMessage = this.translationService.translateInstant('notifications.overlap-dates');
      this.notification.error('ERROR', errorMessage, { nzDuration: 5000 });
      return;
    }

    const startDate = format(selectedStart, 'dd-MM-yyyy');
    const endDate = format(selectedEnd, 'dd-MM-yyyy');

    const bookServiceDto = {
      startDate,
      endDate,
      roomId: this.roomId,
      userId: UserStorageService.getUserId(),
      couponDetails: this.validateForm.get('couponDetails')?.value,
      offerId: ''
    };

    this.clientService.bookService(bookServiceDto).subscribe(res => {
      this.notification.success('SUCCESS', 'Request sent successfully', { nzDuration: 5000 });
      this.router.navigateByUrl('/client/myBookings');
    });
  }

  translateFacilityDescription(description: string): string {
    return this.translationService.translateFacilityDescription(description);
  }

  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }
}
