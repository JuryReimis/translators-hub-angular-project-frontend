import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [CookieService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.checkAuth()) {
      this.authService.closeModal()
      this.router.navigate(['/home'])
      console.log('Attempting to open the login window with existing authentication')
    }
  }

  loginForm: any = {
    login: '',
    password: ''
  }

  onSubmit() {
    this.authService.logIn(this.loginForm.login, this.loginForm.password).subscribe(response => {
      this.close()
    })
  }

  close(result?: string) {
    console.log('close login modal')
    this.authService.closeModal(result)
  }
}
