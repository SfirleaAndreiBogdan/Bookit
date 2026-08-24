import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../basic/services/storage/user-storage.service';
import { ClientService } from '../client/services/client.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TranslationService } from '../components/language-switcher/translation.service';


@Component({
  selector: 'app-add-home-reservation-dialog',
  templateUrl: './add-home-reservation-dialog.component.html',
  styleUrls: ['./add-home-reservation-dialog.component.scss']
})
export class AddHomeReservationDialogComponent implements OnInit{

  validateForm: FormGroup;
  bookingName;
  bookingDescription;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddHomeReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService:ClientService,
    private notification:NzNotificationService,
    private router:Router,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate: [this.data.startDate ? new Date(this.data.startDate) : null, [Validators.required]],
      endDate: [this.data.endDate ? new Date(this.data.endDate) : null, [Validators.required]],
    });
    
    this.bookingDescription = this.data.description;
    this.bookingName = this.data.roomDetails.name;
  }

  submitForm(): void {

    if(UserStorageService.getUserRole() !== "CLIENT" || UserStorageService.getUserRole() === "")
    {
      this.notification.error(
        this.translationService.translateInstant('notifications.errorTitle'),
        this.translationService.translateInstant('notifications.errorMessage')
      );
      return;
    }

    if (this.validateForm.valid) {
      const startDate = this.validateForm.get('startDate')?.value;
      const endDate = this.validateForm.get('endDate')?.value;

      const bookServiceDto = {
        startDate,
        endDate,
        roomId: this.data.roomDetails.id,
        userId: UserStorageService.getUserId(),
        couponDetails: null,
        companyId: this.data.roomDetails.company.id,
        offerId: this.data.id
      };
  
      this.clientService.bookService(bookServiceDto).subscribe(res => {
        this.notification.success('SUCCESS', 'Request sent successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/client/myBookings');
      }, (error) => {
        this.notification.error('ERROR', 'There was an error with your request', { nzDuration: 5000 });
      });
  
      this.dialogRef.close(bookServiceDto);
    }
  }
  
  

  closeDialog() {
    this.dialogRef.close();
  }
}
