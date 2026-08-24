import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';


const TOKEN ='s_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId); 
  }
  
  public saveToken(token : string): void{
    if (this.isBrowser()) {
      localStorage.setItem(TOKEN, token);
    }
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user : string): void{
    if (this.isBrowser()) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER,JSON.stringify(user));
    }
  }

  static getUser(): any{
    if (typeof window === 'undefined') return null;
    return JSON.parse(window.localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user==null) {return '';}
    return user.userID;
  }


  static getUserRole(): string{
    const user = this.getUser();
    if(user==null) {return '';}
    return user.role;
  }


  static clientLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  
  static ownerLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'OWNER';
  }


  static companyLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'COMPANY';
  }

  static signout(): void{
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
    }
  }

}
