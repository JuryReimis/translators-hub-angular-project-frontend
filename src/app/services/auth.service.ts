import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../auth/login/login.component";
import {IToken, IUser} from "../models/authentication";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authToken: string = ''
  private loggedUser$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  private modalRef: NgbModalRef


  constructor(private httpService: HttpClient, private cookieService: CookieService, private modalService: NgbModal,
              private userService: UserService) {
    this.checkAuth()
  }

  openLoginWindow() {
    this.modalRef = this.modalService.open(LoginComponent)
  }

  closeModal(result?: string) {
    this.modalRef.close(result)
  }

  logIn(userName: string, password: string): Observable<IToken> {
    return this.httpService.post<IToken>('http://127.0.0.1:8000/auth/token/login', {
      'username': userName,
      'password': password
    }).pipe(
      tap(
        (authToken) => {
          this.setToken(authToken.auth_token)
          this.checkAuth()
        }),
      catchError(
        (error: any) => {
          console.error('Login error', error)
          return throwError(() => new Error(error))
        }))
  }

  logOut() {
    console.log('logout')
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`
    })
    return this.httpService.post<any>('http://127.0.0.1:8000/auth/token/logout', {}, {headers: headers}).pipe(tap(
        (status: string) => {
          this.destroyToken()
          this.resetLoggedUser()
          this.checkAuth()
        }
      ),
      catchError(
        (error: any) => {
          console.error('Logout error', error)
          return throwError(() => new Error(error))
        }
      ))
  }

  resetLoggedUser() {
    this.loggedUser$.next(null)
  }

  getLoggedUser() {
    return this.loggedUser$
  }


  getToken() {
    return this.authToken
  }

  checkAuth() {
    // Проверка наличия авторизации. Возвращает True, если в сервисе уже сохранен авторизированный пользователь или если
    // запрос по токену произошел успешно. False во всех остальных случаях

    this.authToken = this.cookieService.get('auth_token')
    if (this.authToken) {
      // Если в куки есть токен авторизации
      if (!this.loggedUser$.value) {
        // Если в сервисе еще не сохранен авторизированный пользователь
        const userByToken$ = this.userService.getUserByToken(this.authToken)
        if (userByToken$) {
          userByToken$.subscribe((user) => {
            this.loggedUser$.next(user)
          })
          return true
        } else {
          this.loggedUser$.next(null)
          return false
        }
      }
      else {
        return true
      }
    }
    else {
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
