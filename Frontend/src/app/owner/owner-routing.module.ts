import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { UpdatedBookingComponent } from './pages/updated-booking/updated-booking.component';
import { CreateBookingComponent } from './pages/create-booking/create-booking.component';
import { OwnerDashboardComponent } from './pages/owner-dashboard/owner-dashboard.component';
import { AdminCouponsComponent } from '../company/pages/admin-coupons/admin-coupons.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { OffersManageComponent } from './pages/offers-manage/offers-manage.component';

const routes: Routes = [
  { path: '', component: OwnerComponent },
  { path: 'dashboard', component: OwnerDashboardComponent },
  { path: 'booking', component: CreateBookingComponent },
  { path: 'posts', component: AllPostsComponent },
  { path: 'coupons', component: AdminCouponsComponent },
    { path: 'offers', component: AddOfferComponent },
    { path: 'offers/manage', component: OffersManageComponent },
  { path: 'update/:id', component: UpdatedBookingComponent }];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
