import { Component, OnInit } from '@angular/core';
import { error } from 'node:console';
import { CompanyService } from '../../services/company.service';
import { TranslationService } from '../../../components/language-switcher/translation.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss'
})
export class AllPostsComponent implements OnInit{

  bookings:any;
  loading:boolean;

  constructor(private companybookings: CompanyService,
              private translationService: TranslationService
  ) {}

  ngOnInit(){
    this.loading = true;
    this.getAllBookingsByUserId();
  }

  getAllBookingsByUserId(){
    this.companybookings.getAllBookingsByUserId().subscribe(res =>{
        this.bookings = res;
        this.loading = false;
    })
  }
  deleteBookingById(roomId:any){

    const confirmation = confirm(this.translationService.translateInstant('offers.confirmDelete'));
    if (confirmation) {
      this.companybookings.deleteBookingById(roomId).subscribe(res=>{
        this.getAllBookingsByUserId()
      });
    }
  }
  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }
}
