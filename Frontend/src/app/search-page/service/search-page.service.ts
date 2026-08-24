import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  constructor(private http:HttpClient) { }

  getBookingBySearchCrietria(BookingDto : any) : Observable<any>{
    
    return this.http.get(BASIC_URL + `search-page`,{
          headers: this.createAuthorizationHeader(),
          params: BookingDto       
      });
  }

  createAuthorizationHeader(): HttpHeaders {
      let authHeader: HttpHeaders = new HttpHeaders();
      const token = UserStorageService.getToken();
      if (token) {
          return authHeader.set('Authorization', 'Bearer ' + token);
      } else {
          console.error('Token-ul este null sau undefined');
          return authHeader;
      }
}
}
