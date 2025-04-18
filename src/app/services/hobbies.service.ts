import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../dashboard/models/register';
import { environtment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) { }

  getHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(environtment.apiurl + "hobbies/gethobbies");
  }
}
