import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createBooking(BookingsDto: any): Observable<any> {
    const companyId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `bookings/${companyId}`, BookingsDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  updateBooking(roomId:any,BookingsDto:any):Observable<any>{
    return this.http.put(BASIC_URL + `bookingUpdated/${roomId}`,BookingsDto,{
        headers:this.createAuthorizationHeader()
    })
  } 

  getUsers(){
        return this.http.get(BASIC_URL+`user/role`);
    }

    addCouponForUser(newCoupon): Observable<any>{
      newCoupon.companyId = UserStorageService.getUserId()
        return this.http.post(BASIC_URL+`coupons/add`,{...newCoupon})
    } 


  getAllbookingsByCompanyId(): Observable<any> {
    const companyId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `bookings/${companyId}`,{
      headers: this.createAuthorizationHeader()
    });
  }

  getAllRoomsByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `room/${userId}`);
  }

  addOffer(offerDto):Observable<any>{
    return this.http.post(BASIC_URL + `offer`,offerDto);
  }

  getOfferById(offerId):Observable<any>{
    return this.http.get(BASIC_URL + `offer/detail/${offerId}`);
  }

  updateOffer(offerData):Observable<any>{
    return this.http.put(BASIC_URL + `offer`,offerData);
  }

  deleteOffer(offerId):Observable<any>{
    return this.http.delete(BASIC_URL + `offer/${offerId}`);
  }

  getOffers(): Observable<any>{
    return this.http.get(BASIC_URL + `offer`);
  }

  getOffersByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `offer/${userId}`);
  }

  getReservations():Observable<any>{
    const companyId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`date/${companyId}`);
  }

  getAllBookingsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `posts/${userId}`,{
      headers: this.createAuthorizationHeader()
    });
  }

  getCountryAndCities(): Observable<any>{
    return this.http.get(BASIC_URL + "country-city");
  }    

  deleteBookingById(roomId:any):Observable<any>{
    return this.http.delete(BASIC_URL + `deleteBooking/${roomId}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  getRoomById(roomId:any): Observable<any>{
    return this.http.get(BASIC_URL + `updateBooking/${roomId}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  getFacilities(){
    return this.http.get(BASIC_URL+`facility`);
  }

  changeStatusBooking(roomId:any, status:string): Observable<any>{
    return this.http.get(BASIC_URL + `bookings/${roomId}/${status}`,{
      headers: this.createAuthorizationHeader()
    })
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
