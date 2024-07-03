import {Component, OnInit} from '@angular/core';
import {IUserProfile} from "../models/authentication";
import {AsyncPipe, NgIf} from "@angular/common";
import {ProfilePageHttpService} from "./profile-page-http.service";
import {Observable} from "rxjs";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HttpClientModule
  ],
  templateUrl: './profile-page.component.html',
  providers: [ProfilePageHttpService]
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
