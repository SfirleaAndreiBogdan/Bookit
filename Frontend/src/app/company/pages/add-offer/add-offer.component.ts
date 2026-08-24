import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  offerForm!: FormGroup;
  rooms: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      price: ['', Validators.required],
      nights: ['', Validators.required],
      description: ['', Validators.required],
      roomId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.companyService.getAllRoomsByUserId().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  createOffer(): void {
    
    if (this.offerForm.valid) {
      const offerData = {
        price: this.offerForm.get('price')!.value,
        nights: this.offerForm.get('nights')!.value,
        description: this.offerForm.get('description')!.value,
        roomId: this.offerForm.get('roomId')!.value,
        userId: UserStorageService.getUserId(),
        startDate: this.offerForm.get('startDate')!.value,
        endDate: this.offerForm.get('endDate')!.value
      };
      this.companyService.addOffer(offerData).subscribe({
        next: (res) => {
          this.notification.success('Success', 'Offer created successfully!');
          this.offerForm.reset();
        },
        error: (err) => {
          this.notification.error('Error', 'Failed to create offer.');
          console.error(err);
        }
      });
    }
  }
}
