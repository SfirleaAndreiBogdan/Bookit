import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CreateBookingComponent } from './pages/create-booking/create-booking.component';
import { NgZorroModule } from '../ngZorroModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { UpdatedBookingComponent } from './pages/updated-booking/updated-booking.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { NzNotificationComponent } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WalletOutline } from '@ant-design/icons-angular/icons';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AdminCouponsComponent } from './pages/admin-coupons/admin-coupons.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { OffersManageComponent } from './pages/offers-manage/offers-manage.component';
import { UpdateOfferComponent } from './pages/update-offer/update-offer.component';

@NgModule({
  declarations: [
    CompanyComponent,
    CreateBookingComponent,
    AllPostsComponent,
    UpdatedBookingComponent,
    CompanyDashboardComponent,
    AdminCouponsComponent,
    AddOfferComponent,
    OffersManageComponent,
    UpdateOfferComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    NzTableModule,
    NzNotificationComponent,
    NzCheckboxModule,
    NzInputNumberModule,
    NgxChartsModule,
    NzCardModule,
    NzFormModule,
    NzIconModule.forChild([WalletOutline]),
    TranslateModule
  ]
})
export class CompanyModule { }
