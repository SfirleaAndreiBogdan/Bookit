import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../../company/services/company.service';

@Component({
  selector: 'app-offers-manage',
  templateUrl: './offers-manage.component.html',
  styleUrls: ['./offers-manage.component.scss']
})
export class OffersManageComponent implements OnInit {
  offers: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService, private notification: NzNotificationService) {}

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
    const confirmDelete = confirm('Ești sigur că vrei să ștergi această ofertă?');
  
    if (confirmDelete) {
      this.companyService.deleteOffer(offerId).subscribe({
        next: () => {
          this.notification.success('Succes', 'Oferta a fost ștearsă cu succes!');
          this.loadOffers();
        }
      });
    }
  }  
}
