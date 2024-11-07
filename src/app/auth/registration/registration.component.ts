import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";
import {checkInDatabaseValidator} from "../../validators/async/check-in-database.validator";
import {UserService} from "../../services/user.service";
import {passwordMatchValidator} from "../../validators/sync/password-match.validator";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit{

  public createUserForm: FormGroup

  constructor(private authService: AuthService, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      username: ['', [], [checkInDatabaseValidator(this.userService, 'username')]],
      email: ['', [], [checkInDatabaseValidator(this.userService, 'email')]],
      password: [''],
      repeatPassword: ['',]
    },
      {validators: [Validators.required, passwordMatchValidator()]})
  }

  getControlErrors(control: string) {
    console.log(this.createUserForm)
    const errors = this.createUserForm.get(control)?.errors
    console.log('errors', errors)
    if (errors) {
      return Object.keys(errors).map(key => {
        if (key === 'required') {
          return 'Обязательное поле'
        }
        if (key === control) {
          return errors[key]
        }
      })
    }
    return []
  }


  onSubmit() {
    if (!this.createUserForm.invalid) {
      this.authService.register(this.createUserForm.value).subscribe(response => {
        console.log('User  registered successfully', response);
      }, error => {
        console.error('Registration error', error);
      });
    }
    else {
      console.log(this.createUserForm.errors)
    }
  }

}
