import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { CompanyDashboardComponent } from '../company/pages/company-dashboard/company-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingDetailComponent } from './pages/booking-detail/booking-detail.component';
import { NzNotificationComponent } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReviewComponent } from './pages/review/review.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TrophyOutline, WifiOutline } from '@ant-design/icons-angular/icons';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReviewDialogComponent } from './pages/review-dialog/review-dialog.component';
import { NgZorroModule } from '../ngZorroModule';
import { MatTooltipModule } from '@angular/material/tooltip';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboardComponent,
    BookingDetailComponent,
    MyBookingsComponent,
    ReviewComponent,
    EditProfileComponent,
    ReviewDialogComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    NzNotificationComponent,
    NzFormModule,
    NgZorroModule,
    NzDatePickerModule,
    NzButtonModule,
    NzTableModule,
    NzRateModule,
    FormsModule,
    NzIconModule.forChild([TrophyOutline,WifiOutline]),
    NzCarouselModule,
    NzSelectModule,
    NzSpinModule,
    MatTooltipModule,
    TranslateModule.forChild()
  ]
})
export class ClientModule { }
