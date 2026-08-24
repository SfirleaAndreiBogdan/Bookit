import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../components/language-switcher/translation.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit{

  booked:any;
  loading:boolean = false;

  constructor(private clientService: ClientService,private notification:NzNotificationService,private translationService:TranslationService){
  }

  ngOnInit(){
    this.loading = true;
      this.getMyBookings();
  }


  getMyBookings(){
    this.clientService.getMyBookings().subscribe((res)=>{
        this.booked = res
        this.loading = false;
      })
  }

  isPastEndDate(endDate: string | Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  
    
    const endDateObj = new Date(endDate);
    endDateObj.setHours(0, 0, 0, 0);
    
    return today > endDateObj; 
  }
  

  isBookingStartDate(startDate: string | Date): boolean {
  const today = new Date();
  const bookingDate = new Date(startDate);
  
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);

  return today < bookingDate;
}

  
  getTotalPrice(price: number, startDate: string, endDate: string, discount?: number): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return 0; 
    }

    const timeDiff = end.getTime() - start.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24);

    let totalPrice = price * diffDays;

    if (discount && discount > 0) {
      totalPrice -= totalPrice * (discount / 100);
    }

    return totalPrice;
  }

  
  translateStatus(status: string): string {
    const key = `status.${status.toLowerCase()}`;
    return this.translationService.translateInstant(key);
  }
  

  cancelBooking(reservationId: any) {
    this.clientService.deleteReservation(reservationId).subscribe(() => {
      this.notification.success(
        this.translationService.translateInstant('notifications.successTitle'),
        this.translationService.translateInstant('notifications.successMessage')
      );
      this.getMyBookings();
    });
  }
  

}
