import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SingupComponent } from './basic/components/singup/singup.component';
import { HttpClient, HttpClientModule, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from './ngZorroModule';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { provideHttpClient} from '@angular/common/http';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { SignupOwnerComponent } from './basic/components/signup-owner/signup-owner.component';
import { RegisterUserTypeComponent } from './register-user-type/register-user-type.component';
import { SearchBarComponent } from './components/search-bar/search-bar/search-bar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { HomePageComponent } from './home-page/home-page.component';
import { UserOutline,UserAddOutline  } from '@ant-design/icons-angular/icons';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { BookingsPageComponent } from './bookings-page/bookings-page.component';
import { AddHomeReservationDialogComponent } from './add-home-reservation-dialog/add-home-reservation-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    SignupClientComponent,
    SignupCompanyComponent,
    SignupOwnerComponent,
    RegisterUserTypeComponent,
    SearchBarComponent,
    SearchPageComponent,
    HomePageComponent,
    AiAssistantComponent,
    LanguageSwitcherComponent,
    BookingsPageComponent,
    AddHomeReservationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    NgZorroModule,
    NzRateModule,
    NzNotificationModule,
    NzIconModule.forChild([UserOutline,UserAddOutline ]),
    NzAvatarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NzDropDownModule,
    NzMenuModule,
    MatInputModule,
    MatNativeDateModule,
    InfiniteScrollModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    [{ provide: NZ_I18N, useValue: en_US }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private translate: TranslateService) {
      const savedLanguage = localStorage.getItem('language');

      if (savedLanguage) {
        this.translate.use(savedLanguage);
      } else {
        this.translate.setDefaultLang('ro');
        this.translate.use('ro');
      }
  }

 }
