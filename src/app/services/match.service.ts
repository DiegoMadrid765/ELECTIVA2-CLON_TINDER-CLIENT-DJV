import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  registerMatch(userTo: number) {
    const body = {
      userTo
    }
    return this.http.post(environtment.apiurl + "users/registermatch", body);
  }

  acceptMatch(userTo: number,isMatch:boolean) {
    const body = {
      userTo,
      isMatch
    }
    return this.http.put(environtment.apiurl + "users/acceptmatch", body);
  }
}
