import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { error } from 'console';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{

  reservationId:any;
  validateForm!:FormGroup;
  
  constructor(private fb: FormBuilder,private nznotif: NzNotificationService,
              private router: Router, private clientService: ClientService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
      this.validateForm = this.fb.group({
        rating: [null,Validators.required],
        review: [null,Validators.required]
      })
      this.reservationId = this.activatedRoute.snapshot.params['id'];

  }

  giveReview(){
    const reviewDto = {
        rating : this.validateForm.get('rating')!.value,
        review : this.validateForm.get('review')!.value,
        userId: UserStorageService.getUserId(),
        reservationId: this.reservationId
    }
    this.clientService.giveReview(reviewDto).subscribe((res)=>{
      this.nznotif
      .success(
        'SUCCESS',
        `Review added successfully.`,
        {nzDuration: 5000}
      )
      this.router.navigate(['/client/dashboard']);
    }, error=>{
      this.nznotif
      .error(
      'ERROR',
      `${error.message}`,
      {nzDuration: 5000}
    )
    })
  }
}
