import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../basic/services/storage/user-storage.service';

const Basic_URL = "http://localhost:8080/";

@Injectable({providedIn: 'root'})
export class ClientService {

    constructor(private http : HttpClient) {}

    getAllBookingsByUserId(): Observable<any> {
        const userId = UserStorageService.getUserId()
        return this.http.get(Basic_URL + `my-bookings/${userId}`,{headers: this.createAuthorizationHeader()});
    }

    getBookingsDtoByUserId() :Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.get(Basic_URL + `my-bookings/${userId}`,{headers: this.createAuthorizationHeader()});
    }

    updateUserProfile(userDto:any):Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.put(Basic_URL + `update/${userId}`,userDto,{headers:this.createAuthorizationHeader()})
    }

    getReservationByRoomId(roomId): Observable<any>{
        return this.http.get(Basic_URL + `reservation/${roomId}`)
    }

    getUserCoupons(userId:string):Observable<any>{
        return this.http.get(Basic_URL + `coupons/user/${userId}`);
    }

    serchBookingByName(name:any): Observable<any>{
        return this.http.get(Basic_URL + `search/${name}`,{headers:this.createAuthorizationHeader()});
    }

    serchBooking(name:any): Observable<any>{
        return this.http.get(Basic_URL + `search/${name}`,{headers:this.createAuthorizationHeader()});
    }

    getAllReservationDates(): Observable<any>{
        return this.http.get(Basic_URL + `dates`,{headers: this.createAuthorizationHeader()});
    }


    getDetailsById(roomId:any): Observable<any>{
        return this.http.get(Basic_URL + `booking/${roomId}`,{headers: this.createAuthorizationHeader()});
    }

    bookService(bookingDto:any): Observable<any>{
        return this.http.post(Basic_URL + `booked`,bookingDto,{headers: this.createAuthorizationHeader()});
    }

    getMyBookings(): Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.get(Basic_URL + `my-bookings/${userId}`,{headers: this.createAuthorizationHeader()});
    }

    getUserDetails(): Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.get(Basic_URL + `user/${userId}`,{headers: this.createAuthorizationHeader()});
    }

    giveReview(reviewDto:any): Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.post(Basic_URL + `review`,reviewDto,{headers: this.createAuthorizationHeader()});
    }

    getAllReviewsSite(data){
        const param = new HttpParams().set('roomId',data.roomId).set('reservationId',data.reservationId);
        return this.http.get(Basic_URL + `site/review/${data.userId}`,{...param})
    }

    getCountryAndCities(){
        return this.http.get(Basic_URL + "country-city");
    }    

    deleteReservation(reservationId: any){
        return this.http.delete(Basic_URL + `client/${reservationId}`);
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
