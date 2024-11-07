import {AbstractControl, ValidatorFn} from "@angular/forms";


export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get('password')?.value
    const repeatPassword = control.get('repeatPassword')?.value
    if (password === repeatPassword) {
      return null
    }
    else {
      return {repeatPassword: 'Пароли не совпадают'}
    }
  }

}
