import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUserProfile} from "../models/authentication";
import {Observable} from "rxjs";

@Injectable()
export class ProfilePageHttpService {

  constructor(private http: HttpClient) {
  }

  getProfileData(slug: string): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(`http://127.0.0.1:8000/api/v1/profile/${slug}`)
  }
}
