import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser, IUserUpdate} from "../models/authentication";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  getUserByToken() {
    return this.httpService.get<IUser>('http://127.0.0.1:8000/api/v1/get-user/')
  }

  getUserBySlug(slug: string): Observable<IUser> {
    return this.httpService.get<IUser>(`http://127.0.0.1:8000/api/v1/profile/${slug}/`)
  }

  updateUserData(slug: string, newUserData: IUserUpdate) {
    console.log('update', slug)
    return this.httpService.patch<IUser>(`http://127.0.0.1:8000/api/v1/profile/${slug}/`, {user: newUserData})
  }
}
