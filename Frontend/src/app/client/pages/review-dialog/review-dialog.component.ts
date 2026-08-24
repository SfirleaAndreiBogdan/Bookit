import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  validateForm: FormGroup;
  isSubmitted = false; // Adăugăm un flag pentru a verifica dacă formularul a fost trimis

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    public clientService: ClientService,
    private nznotif: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      review: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      rating: new FormControl(null, [Validators.required]),
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.onCloseDialog();
    });

    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCloseDialog();
      }
    });
  }

  giveReview() {
    this.isSubmitted = true;
    
    if (this.validateForm.invalid) {
      return;
    }

    const reviewDto = {
      rating: this.validateForm.get('rating')!.value,
      review: this.validateForm.get('review')!.value,
      userId: UserStorageService.getUserId(),
      reservationId: '',  
      roomId: ''       
    };

    this.clientService.giveReview(reviewDto).subscribe(
      (res) => {
        this.nznotif.success(
          'SUCCESS',
          `Review added successfully.`,
          { nzDuration: 5000 }
        );
        this.dialogRef.close(true); 
      },
      (err) => {
        this.nznotif.error(
          'ERROR',
          `Failed to add review.`,
          { nzDuration: 5000 }
        );
      }
    );
  }

  onCloseDialog(): void {
    if (!this.isSubmitted && (this.validateForm.dirty || this.validateForm.touched)) {
      if (confirm('Are you sure you want to close without submitting your review?')) {
        this.dialogRef.close(false);
      }
    } else {
      this.dialogRef.close(false);
    }
  }

  onNoClick(): void {
    this.onCloseDialog();
  }
}