import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, Subscription, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../auth/login/login.component";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authToken: string = ''
  private modalRef: NgbModalRef


  constructor(private httpService: HttpClient, private cookieService: CookieService, private modalService: NgbModal) {
  }

  openLoginWindow() {
    this.modalRef =  this.modalService.open(LoginComponent)
  }

  closeModal(result?: string) {
    this.modalRef.close(result)
  }

  logIn(userName: string, password: string): Observable<string> {
    return this.httpService.post<string>('http://127.0.0.1:8000/auth/token/login', {
      'username': userName,
      'password': password
    }).pipe(
      tap(
        (authToken) => {
          this.setToken(authToken)
        }),
      catchError(
        (error: any) => {
          console.error(error)
          return throwError(() => new Error(error))
        }))
  }

  logOut(): Subscription {
    return this.httpService.post<string>('http://127.0.0.1:8000/auth/token/logout', {}).subscribe(
      (status: string) => {
        this.destroyToken()
      }
    )
  }

  getToken() {
    return this.authToken
  }

  checkAuth() {
    this.authToken = this.cookieService.get('auth_token')
    if (this.authToken) {
      return this.authToken
    } else {
      return false
    }
  }

  private setToken(authToken: string) {
    this.cookieService.set('auth_token', authToken, 2, '/', undefined, false, 'Strict')
  }

  private destroyToken() {
    this.cookieService.delete('auth_token')
  }
}
