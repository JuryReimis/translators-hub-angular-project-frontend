import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import { Observable} from "rxjs";
import {ICheckUserNameResponse, IUser, IUserUpdate} from "../models/authentication";
import {NEED_AUTH} from "../constants/auth.context-token";

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

  checkUserData(body: any) {
    const context =  new HttpContext().set(NEED_AUTH, false)
    return this.httpService.post<ICheckUserNameResponse>('http://127.0.0.1:8000/api/v1/check-userdata/', body, {context: context})
  }

  updateUserData(slug: string, newUserData: IUserUpdate) {

    function appendFormData(formData: FormData, data: any) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];

          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'object' && value !== null) {
            appendFormData(formData, value);
          } else {
            formData.append(key, value);
          }
        }
      }
    }

    const formData = new FormData()
    appendFormData(formData, newUserData)


    return this.httpService.patch<IUser>(`http://127.0.0.1:8000/api/v1/profile/${slug}/`, formData)
  }
}
