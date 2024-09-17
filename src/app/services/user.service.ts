import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/authentication";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  getUserByToken(token: string) {
    if (token === '') {
      console.log('User Unauthorized')
      return null
    }
    else {
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
      })
      return this.httpService.get<IUser>('http://127.0.0.1:8000/api/v1/get-user/', {headers})
    }

  }

  getUserBySlug(slug: string): Observable<IUser> {

    return this.httpService.get<IUser>(`http://127.0.0.1:8000/api/v1/profile/${slug}/`)
  }
}
