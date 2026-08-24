import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CreateBookingComponent } from './pages/create-booking/create-booking.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { UpdatedBookingComponent } from './pages/updated-booking/updated-booking.component';
import { AdminCouponsComponent } from './pages/admin-coupons/admin-coupons.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { OffersManageComponent } from './pages/offers-manage/offers-manage.component';
import { UpdateOfferComponent } from './pages/update-offer/update-offer.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'dashboard', component: CompanyDashboardComponent },
  { path: 'booking', component: CreateBookingComponent },
  { path: 'posts', component: AllPostsComponent },
  { path: 'coupons', component: AdminCouponsComponent },
  { path: 'offers', component: AddOfferComponent },
  { path: 'offers/manage', component: OffersManageComponent },
  { path: 'update-offer/:id', component: UpdateOfferComponent },
  { path: 'update/:id', component: UpdatedBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
