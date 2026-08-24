import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchPageService } from './service/search-page.service';
import { TranslationService } from '../components/language-switcher/translation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  queryParamSearch: any;
  extractedBookings: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchPageService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParamSearch = params;
      this.getBookings(this.queryParamSearch);
    });
  }

  updateImg(img: any) {
    return 'data:image/jpeg;base64,' + img;
  }

  getBookings(BookingDto: any) {
    let showLoading = true;
    const loadingTimer = setTimeout(() => {
      if (showLoading) {
        this.loading = true;
      }
    }, 300);

    this.searchService.getBookingBySearchCrietria(BookingDto).subscribe((res) => {
      clearTimeout(loadingTimer);
      this.extractedBookings = res;
      this.loading = false;
    });
  }

  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }
}