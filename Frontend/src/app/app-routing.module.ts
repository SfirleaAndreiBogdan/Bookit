import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupOwnerComponent } from './basic/components/signup-owner/signup-owner.component';
import { RegisterUserTypeComponent } from './register-user-type/register-user-type.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { BookingDetailComponent } from './client/pages/booking-detail/booking-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingsPageComponent } from './bookings-page/bookings-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'register_company', component: SignupCompanyComponent},
  { path: 'register_client', component: SignupClientComponent},
  { path: 'register_owner', component: SignupOwnerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterUserTypeComponent},
  { path: 'bookingsPage', component: BookingsPageComponent},
  { 
    path: 'search-page', 
    component: SearchPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { path: 'client/booking/:id', component: BookingDetailComponent},
  {path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
