import {Component, OnInit} from '@angular/core';
import {IUserProfile} from "../models/authentication";
import {AsyncPipe, NgIf} from "@angular/common";
import {ProfilePageHttpService} from "./profile-page-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit{
  userProfile$: Observable<IUserProfile>
  profileOwner: boolean = true

  constructor(private profilePageHttpService: ProfilePageHttpService) {
  }

  ngOnInit() {
    this.userProfile$ = this.profilePageHttpService.getProfileData('reimis')
  }
}
