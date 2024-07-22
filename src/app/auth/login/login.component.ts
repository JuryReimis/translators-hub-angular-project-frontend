import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
// import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }


  loginForm: any = {
    login: '',
    password: ''
  }

  // onSubmit() {
  //   console.log(this.authService.checkAuth())
  // }

}
