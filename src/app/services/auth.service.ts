import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../auth/login/login.component";
import {IToken, IUser} from "../models/authentication";
import {UserService} from "./user.service";
import {StorageService} from "./storage.service";
import {NEED_AUTH} from "../constants/auth.context-token";
import {RegistrationComponent} from "../auth/registration/registration.component";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authToken$: Observable<string | null>
  private loggedUser$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  private isFirstServiceInit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  private modalRef: NgbModalRef


  constructor(private httpService: HttpClient, private storageService: StorageService, private modalService: NgbModal,
              private userService: UserService) {
    this.checkAuth()
  }

  openLoginWindow() {
    this.modalRef = this.modalService.open(LoginComponent)
  }

  openRegistrationWindow() {
    this.modalRef = this.modalService.open(RegistrationComponent)
  }

  closeModal(result?: string) {
    this.modalRef.close(result)
  }

  logIn(userName: string, password: string) {
    return this.httpService.post<IToken>('http://127.0.0.1:8000/auth/token/login', {
        'username': userName,
        'password': password
      },
      {context: new HttpContext().set(NEED_AUTH, false),}).pipe(
      tap(
        (authToken) => {
          this.storageService.setToken(authToken.auth_token)
          return authToken
        }),
      catchError(
        (error: any) => {
          console.error('Login error', error)
          throw error
        }))
  }

  logOut() {
    console.log('logout')
    return this.httpService.post<any>('http://127.0.0.1:8000/auth/token/logout', {}).pipe(tap(
        (status: string) => {
          this.storageService.destroyToken()
          this.resetLoggedUser()
        }
      ),
      catchError(
        (error: any) => {
          console.error('Logout error', error)
          return throwError(() => new Error(error))
        }
      ))
  }

  register(registerData: any) {
    const context = new HttpContext().set(NEED_AUTH, false)
    return this.httpService.post('http://127.0.0.1:8000/api/v1/create-user/', registerData, {context: context})
  }

  resetLoggedUser() {
    this.loggedUser$.next(null)
    this.isFirstServiceInit$.next(true)
  }

  getLoggedUser() {
    // Возвращает поток с пользователем, который вошел в систему
    return this.loggedUser$.asObservable()
  }

  checkAuth() {
    // Проверка наличия авторизации.

    this.authToken$ = this.storageService.getToken$()


    this.authToken$.subscribe((authToken: string | null) => {
        if (authToken) {
          // Если в куки есть токен авторизации
          if (!this.loggedUser$.value) {
            // Если в сервисе еще не сохранен авторизированный пользователь
            if (this.isFirstServiceInit$.value) {
              this.isFirstServiceInit$.next(false)
              const userByToken$ = this.userService.getUserByToken()
              if (userByToken$) {
                userByToken$.subscribe((user) => {
                  this.loggedUser$.next(user)
                })
              } else {
                this.resetLoggedUser()
              }
            }
          }
        }
      }
    )
  }
}
