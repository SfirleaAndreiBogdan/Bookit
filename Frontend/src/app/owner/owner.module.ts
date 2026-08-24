import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';

import { NgZorroModule } from '../ngZorroModule';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzNotificationModule } from 'ng-zorro-antd/notification'; // Nu mai importa componentul individual
import { OwnerDashboardComponent } from './pages/owner-dashboard/owner-dashboard.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { CreateBookingComponent } from './pages/create-booking/create-booking.component';
import { UpdatedBookingComponent } from './pages/updated-booking/updated-booking.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WalletOutline } from '@ant-design/icons-angular/icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { OffersManageComponent } from './pages/offers-manage/offers-manage.component';
import { UpdateOfferComponent } from './pages/update-offer/update-offer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerDashboardComponent,
    AllPostsComponent,
    CreateBookingComponent,
    UpdatedBookingComponent,
    AddOfferComponent,
    OffersManageComponent,
    UpdateOfferComponent
  ],
  imports: [
     CommonModule,
        OwnerRoutingModule,
        NgZorroModule,
        ReactiveFormsModule,
        NzTableModule,
        NzNotificationModule,
        NzCheckboxModule,
        NzInputNumberModule,
        NgxChartsModule,
        NzCardModule,
        NzFormModule,
        NzIconModule.forChild([WalletOutline]),
        TranslateModule
  ]
})
export class OwnerModule { }
