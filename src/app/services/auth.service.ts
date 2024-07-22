import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authToken: string = ''


  constructor( private httpService: HttpClient) {
  }

  logIn(userName: string, password: string): Observable<any> {
    return this.httpService.post<any>('http://localhost:8000/auth/token/login', {
      'username': userName,
      'password': password
    })
  }

  // checkAuth() {
  //   this.authToken = this.cookieService.get('auth_token')
  //   if (this.authToken) {
  //     return this.authToken
  //   } else {
  //     return false
  //   }
  // }

  // setToken(authToken: string) {
  //   this.cookieService.set('auth_token', authToken, 2, '/', undefined, false, 'Strict')
  // }
}
