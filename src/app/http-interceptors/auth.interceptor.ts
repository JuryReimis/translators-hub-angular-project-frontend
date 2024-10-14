import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {NEED_AUTH} from "../constants/auth.context-token";
import {catchError, map, mergeMap, of, retry, take} from "rxjs";
import {Router} from "@angular/router";

export const authInterceptor = (req:HttpRequest<any>, next: HttpHandlerFn) => {

  const router: Router = inject(Router)
  const authToken$ = inject(StorageService).getToken$().pipe(
    mergeMap(authToken => {
      if (authToken === null && req.context.get(NEED_AUTH)) {
        throw "Нет токена авторизации"
      }
      else {
        return of(authToken)
      }
    }
      ),
    retry(2),
    take(1)
  )

  return authToken$.pipe(
    map((authToken: string|null) => {
      if (req.context.get(NEED_AUTH) && authToken) {
        console.log("Отправка с авторизацией", authToken);
        return req.clone({
          headers: req.headers.append('Authorization', `Token ${authToken}`)
        });
      } else {
        console.log("Отправка без авторизации");
        return req;
      }
    }),
    mergeMap((newReq) => next(newReq)),
    catchError(err => {
      if (err === 'Нет токена авторизации') {
        console.error('Больше трех запросов', err)
        router.navigate(['/home']).then((value) => {
          console.log('Navigate after error', value)
        })
        throw err
      }
      else {
        console.log("Сторонняя ошибка" ,err)
        throw err
      }
    })
  );


};
