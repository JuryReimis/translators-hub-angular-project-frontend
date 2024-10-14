import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService{

  private authToken: string
  private authToken$: BehaviorSubject<string|null> = new BehaviorSubject<string | null>(null)

  constructor(private cookieService: CookieService) {
    if (cookieService.check('auth_token')) {
      console.log('имеется', this.cookieService.get('auth_token'))
      this.authToken$.next(cookieService.get('auth_token'))
      this.authToken = cookieService.get('auth_token')
    }
    else {
      console.log('Не имеется')
    }
    this.authToken = this.cookieService.get('auth_token')
    console.log('constructor', this.authToken)
  }

  getToken$() {
    return this.authToken$.asObservable()
  }

  setToken(authToken: string) {
    this.cookieService.set('auth_token', authToken, 2, '/', undefined, false, 'Strict')
    this.authToken$.next(authToken)
  }

  destroyToken() {
    this.cookieService.delete('auth_token')
    this.authToken$.next(null)
  }
}
