import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environtment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient) { }

  registerUser(body: any): Observable<any> {
    return this.http.post(environtment.apiurl + "authusers/registeruser", body);
  }

  verifyExistsUser(email: string) {
    return this.http.get(environtment.apiurl + "authusers/verifyexistsuser/" + email);
  }

  login(body: any) {
    return this.http.post(environtment.apiurl + "authusers/login", body);
  }

  getUserId() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode<any>(token!);
    const { userId } = decoded;
    return userId;
  }

  validateToken(){
    try {
      const token=localStorage.getItem("token");
      if(!token){
        return false;
      }
      jwtDecode(token);
      return true;
    } catch (error) {
      return false;
    }
  }

}
