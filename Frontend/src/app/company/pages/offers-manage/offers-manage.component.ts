import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslationService } from '../../../components/language-switcher/translation.service';

@Component({
  selector: 'app-offers-manage',
  templateUrl: './offers-manage.component.html',
  styleUrls: ['./offers-manage.component.scss']
})
export class OffersManageComponent implements OnInit {
  offers: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService, private notification: NzNotificationService, private translationService: TranslationService) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.companyService.getOffersByUserId().subscribe({
      next: (data) => {
        this.offers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load offers.';
        this.loading = false;
      }
    });
  }

  deleteOffer(offerId: string): void {
    const confirmDelete = confirm(this.translationService.translateInstant('offers.confirmDelete'));
    if (confirmDelete) {
      this.companyService.deleteOffer(offerId).subscribe({
        next: () => {
          this.loadOffers();
        }
      });
    }
  }
  

  
}
