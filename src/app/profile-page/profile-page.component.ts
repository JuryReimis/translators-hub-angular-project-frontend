import {Component, OnInit} from '@angular/core';
import {IUser} from "../models/authentication";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable, switchMap, tap} from "rxjs";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  user$: Observable<IUser>
  user: IUser
  userSlug: string
  profileOwner$ = false
  loggedUser$: Observable<IUser|null>

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loggedUser$ = this.authService.getLoggedUser()
    this.route.params.pipe(switchMap(params=> {
      console.log(params)
      this.userSlug = params['slug'];
      return this.loggedUser$
    }),
      tap(loggedUser => {
        this.updateData(loggedUser)
      })).subscribe()



  }

  updateData(loggedUser: IUser|null) {
    console.log('updateData slug', this.userSlug)
    this.user$ = this.userService.getUserBySlug(this.userSlug).pipe(
      tap((user: IUser) => {
        if (user.userprofile.slug === loggedUser?.userprofile.slug) {
          this.profileOwner$ = true
        }
        else {
          this.profileOwner$ = false
        }
      })
    )
  }
}
