import { Component, OnInit } from '@angular/core';
import { HomePageService } from './service/home-page.service';
import { CompanyService } from '../company/services/company.service';
import { ClientService } from '../client/services/client.service';
import { UserStorageService } from '../basic/services/storage/user-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHomeReservationDialogComponent } from '../add-home-reservation-dialog/add-home-reservation-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  rooms;
  popularHotels: any[] = [];
  clientReviews: any;
  imagePrivide: string[] = [];
  loading = true;
  error: string | null = null;
  offers: any[] = [];
  offerPrice;

  constructor(private homePageService: HomePageService, 
              private companyService: CompanyService, 
              private clientService: ClientService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadReviews();
    this.loadOffers(); 
  }

  loadBookings() {
  this.homePageService.getBookingsByReview().subscribe(
    (res) => {
      this.rooms = res;
      this.popularHotels = [];

      const addedRoomIds = [];

      for (const room of this.rooms) {
        if (room.rating >= 4 && !addedRoomIds.includes(room.roomId)) {
          addedRoomIds.push(room.roomId);
          this.popularHotels.push(room.roomDetails);

          if (this.popularHotels.length === 4) break;
        }
      }

      this.loading = false;
    },
    (err) => {
      this.loading = false;
    }
  );
}


  openDialog(offer: any): void {
    const dialogRef = this.dialog.open(AddHomeReservationDialogComponent, {
      width: '400px',
      data: offer
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  

  loadReviews() {
    let userIdReview;
    if (UserStorageService.getUserId()) {
      userIdReview = UserStorageService.getUserId();
    } else {
      userIdReview = null;
    }
    const data = {
      userId: userIdReview,
      roomId: null,
      reservationId: null
    };
    this.clientService.getAllReviewsSite(data).subscribe((res) => {
      this.clientReviews = res;
    });
  }

  loadOffers() {
    this.companyService.getOffers().subscribe(
      (res) => {
        this.offers = res;
        this.offers = res.map(offer => {
          offer.totalPrice = offer.roomDetails.price * offer.nights;
          return offer;
        });
      },
      (err) => {
        console.error('Failed to load offers', err);
      }
    );
  }
}
