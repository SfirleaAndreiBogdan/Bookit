import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.scss']
})
export class UpdateOfferComponent implements OnInit {
  offerId: string;
  offerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.loadOffer(this.offerId);
  }

  loadOffer(id: string): void {
    this.companyService.getOfferById(id).subscribe((res) => {
      const formattedStartDate = this.formatDate(res.startDate);
      const formattedEndDate = this.formatDate(res.endDate);
      
      this.offerForm = this.fb.group({
        description: [res.description, Validators.required],
        startDate: [formattedStartDate, Validators.required],
        endDate: [formattedEndDate, Validators.required],
        price: [res.price, [Validators.required, Validators.min(0)]],
        nights: [res.nights, [Validators.required, Validators.min(1)]]
      });
    });
  
  }
  
  private formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }
  

  onSubmit(): void {
    if (this.offerForm.valid) {
      const updateData = {
        id: this.offerId,
        price: this.offerForm.get('price')?.value,
        nights: this.offerForm.get('nights')?.value,
        endDate: this.offerForm.get('endDate')?.value,
        startDate: this.offerForm.get('startDate')?.value,
        description: this.offerForm.get('description')?.value
      };
      
      this.companyService.updateOffer(updateData).subscribe(
        (res) => {
          this.notification.success('Succes', 'Oferta a fost actualizată cu succes!');
          this.router.navigate(['company/offers/manage']);
        },
      );
    } else {
      this.notification.error('Formular invalid', 'Te rugăm să completezi corect toate câmpurile!');
    }
  }
  
}
