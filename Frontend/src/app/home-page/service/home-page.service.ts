import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http:HttpClient) { }

  getBookings(data: {skip: number, limit: number}): Observable<any> {
  const params = new HttpParams()
    .set('skip', data.skip.toString())
    .set('limit', data.limit.toString());

  return this.http.get(BASIC_URL + `home/bookings`, { params });
}


  getAllBookings(): Observable<any>{
    return this.http.get(BASIC_URL + `home/all`);
  }

  getBookingsByReview(): Observable<any>{
    return this.http.get(BASIC_URL + `home/review`);
  }

  getReviews(): Observable<any>{
    return this.http.get(BASIC_URL+`home/all/reviews`);
  }

  getBookingsByReviewId(roomId: any): Observable<any>{
    return this.http.get(BASIC_URL + `home/review/${roomId}`);
  }

  getFacilitiesByBooking(ids: string[]) {
  const params = new HttpParams().set('ids', ids.join(','));
  return this.http.get(BASIC_URL + 'facility/room', { params });
}

}
