import {Component, OnInit, ViewChild} from '@angular/core';

import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NavOffcanvasComponent} from "./nav-offcanvas/nav-offcanvas.component";
import {RouterLink} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";
import {AuthService} from "../services/auth.service";
import {IUser} from "../models/authentication";
import {Observable, map} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'my-nav-bar',
  standalone: true,
  imports: [NgbDatepickerModule, NavOffcanvasComponent, RouterLink, LoginComponent, AsyncPipe],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit{
  @ViewChild(NavOffcanvasComponent) private navOffcanvasComponent!: NavOffcanvasComponent;

  private loggedUser$: Observable<IUser | null>
  public status$: Observable<IUser|string>

  ngOnInit() {
    this.loggedUser$ = this.authService.getLoggedUser()
    this.status$ = this.loggedUser$.pipe(
      map((user) => {
        if (user) {
          return user.username;
        } else {
          return 'Login/Register';
        }
      })
    );
  }

  constructor(private authService: AuthService) {
  }

  openOffcanvas() {
    this.navOffcanvasComponent.open(this.navOffcanvasComponent.content)
  }
}
