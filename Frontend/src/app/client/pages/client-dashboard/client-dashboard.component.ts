import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isValid, parse } from 'date-fns';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  levelNames: string[] = [];
  translatedLevelName: string = '';
  bookings = [];
  validateForm!: FormGroup;
  upcomingBooking: any;
  totalBookings: number = 0;
  recentBookings: any;
  notifications: any;
  userDet: any;
  coupons: any[] = [];
  reservations: any;
  userId: any;
  loyaltyData: any;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {}

  calculateLoyaltyProgress(totalBookings: number) {
    this.levelNames = [
      "explorer", "adventurer", "nomad", "experienced_traveler",
      "globetrotter", "travel_enthusiast", "jet_setter", "world_wanderer"
    ];

    const pointsPerBooking = 50;
    let totalPoints = totalBookings * pointsPerBooking;
    let level = 1;
    let bookingsForNextLevel = 3;
    let bookingsAtCurrentLevel = totalBookings;

    while (bookingsAtCurrentLevel >= bookingsForNextLevel) {
      bookingsAtCurrentLevel -= bookingsForNextLevel;
      level++;
      bookingsForNextLevel *= 2;
    }

    const progressPercentage = (bookingsAtCurrentLevel / bookingsForNextLevel) * 100;
    const levelName = this.levelNames[level - 1] || `Nivel ${level}`;

    this.loadLevelName(levelName);

    return {
      level: level,
      levelName: levelName,
      points: totalPoints,
      progressPercentage: progressPercentage.toFixed(2),
      bookingsToNextLevel: bookingsForNextLevel - bookingsAtCurrentLevel
    };
  }

  loadLevelName(levelName: string) {
    this.translate.get(`levels.${levelName}`).subscribe((translatedLevel: string) => {
      this.translatedLevelName = translatedLevel;
    });
  }

  getAllBookings() {
    this.clientService.getAllBookingsByUserId().subscribe((res) => {
      this.bookings = res.filter(b => b.reservationStatus !== 'CANCELED');
      this.totalBookings = this.bookings.length;
      this.loyaltyData = this.calculateLoyaltyProgress(this.totalBookings);
      this.getReservations();
    });
  }

  getReservations() {
  this.clientService.getBookingsDtoByUserId().subscribe((res) => {
    this.reservations = res.filter(r => r.reservationStatus !== 'CANCELED');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = this.reservations
      .filter(r => {
        const start = new Date(r.startDate);
        start.setHours(0, 0, 0, 0);
        return start >= today;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    this.upcomingBooking = upcoming.length > 0 ? upcoming[0] : null;

    this.recentBookings = [...this.reservations].slice(0, 3);
  });
}

  getUserDetails() {
    this.clientService.getUserDetails().subscribe((res) => {
      this.userDet = res;
    });
  }

  getUserCoupons() {
    this.clientService.getUserCoupons(UserStorageService.getUserId()).subscribe((res) => {
      console.log(res)
      this.coupons = res;
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      booking: [null, [Validators.required]]
    });

    this.userId = UserStorageService.getUserId();
    this.getAllBookings();
    this.getUserDetails();
    this.getUserCoupons();
  }

  updateImg(img: string) {
    return 'data:image/jpeg;base64,' + img;
  }
}
