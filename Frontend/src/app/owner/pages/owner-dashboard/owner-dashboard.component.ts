import { Component } from '@angular/core';
import { CompanyService } from '../../../company/services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { parse } from 'date-fns';
import { TranslationService } from '../../../components/language-switcher/translation.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss'
})
export class OwnerDashboardComponent {


bookings: any;
  bookingsCount: number;
  totalRevenue: any;
  RevenueSum: number;
  monthlyRevenue: any;
  monthlyBookings: any;
  occupancyData: any;
  pendingRequests: number;

  constructor(
    private companyService: CompanyService,
    private notif: NzNotificationService,
    private translateService: TranslationService
  ) {}

  ngOnInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.companyService.getAllbookingsByCompanyId().subscribe((res) => {
      this.bookings = res.filter(b => b.reservationStatus !== 'CANCELED');
      this.bookingsCount = this.bookings.length;
      this.RevenueSum = 0;
      this.monthlyRevenue = [];
      this.monthlyBookings = [];
      this.occupancyData = [];
      this.pendingRequests = 0;

      this.calculateMonthlyRevenueAndBookings();
      this.calculateOccupancyData();
      this.getReservations();

      this.pendingRequests = this.bookings.filter(
        booking => booking.reservationStatus === 'PENDING'
      ).length;

      this.totalRevenue = this.RevenueSum;
    });
  }

  getRevenueYAxisLabel(): string {
    const revenue = this.translateService.translateInstant('companyDashboard.revenue');
    const currency = this.translateService.translateInstant('companyDashboard.currency');
    return `${revenue} (${currency})`;
  }

  getReservations() {
    this.companyService.getReservations().subscribe((res) => {
    });
  }

  calculateMonthlyRevenueAndBookings() {
    this.bookings.forEach(booking => {
      if (booking.reservationStatus === 'CANCELED') return;

      const startDate = parse(booking.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(booking.endDate, 'dd-MM-yyyy', new Date());

      const diff_in_days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      booking.price *= diff_in_days;

      const monthKey = startDate.toLocaleString('default', { month: 'short' });

      const existingMonth = this.monthlyRevenue.find(m => m.name === monthKey);
      const monthBooking = this.monthlyBookings.find(b => b.name === monthKey);

      if (existingMonth) {
        existingMonth.value += booking.price;
        monthBooking.value += 1;
      } else {
        this.monthlyRevenue.push({ name: monthKey, value: booking.price });
        this.monthlyBookings.push({ name: monthKey, value: 1 });
      }

      this.RevenueSum += booking.price;
    });
  }

  calculateOccupancyData() {
    let occupiedCount = 0;
    let availableCount = 0;

    this.bookings.forEach(booking => {
      if (booking.reservationStatus === 'CANCELED') return;

      if (booking.reservationStatus === 'APPROVED') {
        occupiedCount++;
      } else {
        availableCount++;
      }
    });

    const totalRooms = occupiedCount + availableCount;

    if (totalRooms === 0) {
      this.occupancyData = [];
    } else {
      this.occupancyData = [
        { name: 'Occupied', value: (occupiedCount / totalRooms) * 100 },
        { name: 'Available', value: (availableCount / totalRooms) * 100 }
      ];
    }
  }

  changeStatus(roomId: any, status: string) {
    this.pendingRequests--;

    this.companyService.changeStatusBooking(roomId, status).subscribe(
      (res) => {
        this.notif.success('SUCCESS', `Booking status changed successfully`, { nzDuration: 5000 });
        this.getAllBookings();
      },
      error => {
        this.notif.error('ERROR', `${error.message}`, { nzDuration: 5000 });
      }
    );
  }

  translateStatus(status: string): string {
      const key = `status.${status.toLowerCase()}`;
      return this.translateService.translateInstant(key);
  }


}
