import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../home-page/service/home-page.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../components/language-switcher/translation.service';

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.scss']
})
export class BookingsPageComponent implements OnInit {
  extractedBookings: any[] = [];
  loading: boolean = false;
  limitPage: number = 30;
  skip: number = 0;
  noMoreBookings: boolean = false;

  constructor(private homePageService: HomePageService, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    if (this.loading || this.noMoreBookings) return;

    this.loading = true;
    const data = {
      skip: (this.skip) * this.limitPage,
      limit: this.limitPage
    };
    
    this.homePageService.getBookings(data).subscribe(
      (res: any[]) => {
        if ( res.length == 0) {
          this.noMoreBookings = true;
        }
        this.extractedBookings.push(...res);
        this.loading = false;
        this.skip++;
      },
      (err) => {
        console.error('Eroare la încărcarea rezervărilor', err);
        this.loading = false;
      }
    );
  }
  
  updateImg(img: string): string {
    return 'data:image/jpeg;base64,' + img;
  }

  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }
}
