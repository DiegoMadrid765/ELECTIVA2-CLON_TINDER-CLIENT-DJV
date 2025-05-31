import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userInformation: any = {};
  showDescription: boolean = false;
  constructor(private http: HttpClient) { }

  getLoggedUserInformation() {
    return this.http.get(environtment.apiurl + "users/getloggeduserinformation");
  }

  getUserInformationForMatch() {
    return this.http.get(environtment.apiurl + "users/getUserInformationForMatch");
  }
  getUserInformationForMatchFilter(country: string, city: string) {
    const body = {
      country,
      city
    }
    return this.http.post(environtment.apiurl + "users/getUserinformationformatchfilter", body);
  }
  getLoggedUser() {
    return this.userInformation;
  }
  getChatsLists(): Observable<any> {
    return this.http.get(environtment.apiurl + "users/getchatslist");
  }

  getMessages(idMatch: number): Observable<any> {
    return this.http.get(environtment.apiurl + "users/getmessages/" + idMatch);
  }

  registerChat(idMatch: number, message: string): Observable<any> {
    const body = {
      idMatch,
      message
    }
    return this.http.post(environtment.apiurl + "users/registerchat", body);
  }
}
