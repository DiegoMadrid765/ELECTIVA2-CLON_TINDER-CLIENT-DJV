import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userInformation: any = {};
  showDescription:boolean=false;
  constructor(private http: HttpClient) { }

  getLoggedUserInformation() {
    return this.http.get(environtment.apiurl + "users/getloggeduserinformation");
  }

  getUserInformationForMatch() {
    return this.http.get(environtment.apiurl + "users/getUserInformationForMatch");
  }
}
