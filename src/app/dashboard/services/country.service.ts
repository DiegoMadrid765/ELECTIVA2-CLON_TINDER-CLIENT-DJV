import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get("https://restcountries.com/v3.1/all");
  }
  getCitiesByCountry(country: string):Observable<any> {
    const body = {
      country
    }
    return this.http.post("https://countriesnow.space/api/v0.1/countries/cities", body);
  }
}
