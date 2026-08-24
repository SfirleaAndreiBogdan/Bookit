import { Component, HostListener, OnInit } from '@angular/core';
import { ClientService } from '../../../client/services/client.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  countiesWithCities: any;
  filteredCities: any[] = [];
  selectedCounty: any = [];
  selectedCity: any = [];
  startDate: Date;
  endDate: Date;
  roomName: string = '';
  searchByNameOnly: boolean = false;

  dogAssistent = "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_ro.htm";
  detailsVisible = false;
  numAdults = 1;
  numChildren = 0;
  numRooms = 1;
  withPet = false;
  searchBarVisible: boolean = false;

  constructor(
    private clientService: ClientService,
    private route: Router,
    private notification: NzNotificationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadCountyAndCities();
    this.searchBarVisible = false;
  }

  openDetails() {
    this.detailsVisible = true;
  }

  increaseAdults() { this.numAdults++; }
  decreaseAdults() { if (this.numAdults > 1) this.numAdults--; }
  increaseChildren() { this.numChildren++; }
  decreaseChildren() { if (this.numChildren > 0) this.numChildren--; }
  increaseRooms() { this.numRooms++; }
  decreaseRooms() { if (this.numRooms > 1) this.numRooms--; }

  confirm() {
    this.detailsVisible = false;
  }

  get guestsText(): string {
    const parts = [
      this.getPluralizedText('adult', this.numAdults),
      this.numChildren === 0
        ? this.translate.instant('search.noChildren')
        : this.getPluralizedText('child', this.numChildren),
      this.getPluralizedText('room', this.numRooms)
    ];

    if (this.withPet) {
      parts.push(this.translate.instant('search.withPet'));
    }

    return parts.join(' | ');
  }

  private getPluralizedText(baseKey: string, count: number): string {
    if (count === 1) {
      return `1 ${this.translate.instant(`search.${baseKey}`)}`;
    }
    return `${count} ${this.translate.instant(`search.${baseKey}s`)}`;
  }

  loadCountyAndCities() {
    this.clientService.getCountryAndCities().subscribe((res) => {
      if (Array.isArray(res)) {
        this.countiesWithCities = res;
      } else {
        console.error("Unexpected API response format:", res);
      }
    });
  }

  onCountyChange(): void {
    if (this.selectedCounty) {
      this.filteredCities = this.selectedCounty.city.map(city => ({ name: city }));
    } else {
      this.filteredCities = [];
    }
    this.selectedCity = [];
  }

  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  @HostListener('document:click', ['$event'])
  closeSearchBar(event: Event) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.search-bar') &&
      !target.closest('.iconSearch') &&
      !target.closest('nz-date-picker') &&
      !target.closest('.ant-picker-dropdown')
    ) {
      this.searchBarVisible = false;
    }
  }

  search() {
    if (!this.startDate || !this.endDate) {
      this.notification.error("ERROR", "Please select check-in and check-out dates.");
      return;
    }

    if (this.searchByNameOnly) {
      if (!this.roomName || !this.roomName.trim()) {
        this.notification.error("ERROR", "Please enter a room name.");
        return;
      }

      const queryParams = {
        roomName: this.roomName.trim(),
        checkIn: this.startDate.toISOString().split('T')[0],
        checkOut: this.endDate.toISOString().split('T')[0]
      };

      this.searchBarVisible = false;
      this.route.navigate(['/search-page'], { queryParams });
      return;
    }

    if (!this.selectedCounty || !this.selectedCity) {
      this.notification.error("ERROR", "Please select a county and city.");
      return;
    }

    const queryParams = {
      county: this.selectedCounty.county,
      city: this.selectedCity.name,
      persons: this.numAdults,
      childs: this.numChildren,
      rooms: this.numRooms,
      petAllowed: this.withPet,
      checkIn: this.startDate.toISOString().split('T')[0],
      checkOut: this.endDate.toISOString().split('T')[0],
    };

    this.searchBarVisible = false;
    this.route.navigate(['/search-page'], { queryParams });
  }

  disabledStartDate = (current: Date): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return this.endDate ? current >= this.endDate || current < currentDate : current < currentDate;
  };

  disabledEndDate = (current: Date): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return this.startDate ? current <= this.startDate || current < currentDate : current < currentDate;
  };
}
