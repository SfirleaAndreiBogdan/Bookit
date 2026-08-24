import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AiAssistantServiceService {

  constructor(private http:HttpClient) { }

  sendMessage(mesaj:string): Observable<any> {
    return this.http.post(BASIC_URL + 'api/claude/message', { message: mesaj });
  }

  sendMessageWithData(message: string, bookingsData: any, reviewsData: any, reservationData: any): Observable<any> {
    const data = {
      message: message,
      bookings: bookingsData,
      reviews: reviewsData,
      reservationData: reservationData,
      role: UserStorageService.getUserRole()? UserStorageService.getUserRole() : "ANONIM" 
    };
    return this.http.post<any>(BASIC_URL +`api/claude/messageWithData`, data);
  }
}
