import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';
export const AUTH_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userStorageService : UserStorageService) { }

  registerClient(signupDto:any): Observable<any>{
     return this.http.post(BASIC_URL + "client/sign-up", signupDto);
  }
  registerCompany(signupDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "company/sign-up", signupDto);
  }

  registerOwner(signupDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "owner/sign-up", signupDto);
  }

  getCountryAndCities(){
    return this.http.get(BASIC_URL + "country-city");
  }

 login(username:string,password:string){
  return this.http.post(BASIC_URL + "authenticate", {username,password},{observe: 'response', headers: { 'Content-Type': 'application/json' }} )
  .pipe(
    map((res: HttpResponse<any>) =>{
      this.userStorageService.saveUser(res.body);
      const tokenLength = res.headers.get(AUTH_HEADER)?.length;
      const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7,tokenLength);
      this.userStorageService.saveToken(bearerToken);
      return res;
    })
  );

}

}
