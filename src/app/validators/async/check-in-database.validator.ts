import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {catchError, debounceTime, first, map, of, switchMap, tap} from "rxjs";
import {UserService} from "../../services/user.service";


const registrationFields: string[] = ['username', 'email']


export function checkInDatabaseValidator(userService: UserService, controlName: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (registrationFields.includes(controlName)) {
          return checkUserData(control, userService, controlName)
        }
        else {
          return of(null)
        }
      }),
      first()
    )
  }
}


function checkUserData(control: AbstractControl,userService: UserService, controlName: string) {
  return userService.checkUserData({[controlName]: control.value}).pipe(map(response => {
      if (!response.available) {
        return response.errors
      }
      else {
        return null
      }
    },
  ),
    catchError(() => of(null)))
}

