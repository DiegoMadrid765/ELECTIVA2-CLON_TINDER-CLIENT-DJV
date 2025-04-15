import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environtment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService{

  constructor(private http: HttpClient) { }

  registerUser(body: any): Observable<any> {
    return this.http.post(environtment.apiurl + "authusers/registeruser", body);
  }
}
