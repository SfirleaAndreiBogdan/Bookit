import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CountryCityService implements OnInit{

  constructor(private http:HttpClient) { }
  countries : any[]=[];

  cities = [];
  
  
  ngOnInit(): void {
      this.getCountriesData();
  }

  getCountriesData() {
    const url = 'https://countriesnow.space/api/v0.1/countries';

    this.http.get(url).subscribe(
      (data: any) => {
        this.countries = data.data;
      },
      error => {
        console.error('Eroare la obținerea țărilor:', error);
      }
    );
  }

  getCities(country: string): Observable<any> {
    const url = `https://countriesnow.space/api/v0.1/countries/cities`;
    const body = { country: country };

    return this.http.post(url, body);
  }

  getCountries() {
    return this.countries;
  }

}
