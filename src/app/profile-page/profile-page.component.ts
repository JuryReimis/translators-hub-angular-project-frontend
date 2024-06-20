import { Component } from '@angular/core';
import {IUser, IUserProfile} from "../models/authentication";
import {reimis} from "../data/user.data";
import {reimisProfile} from "../data/user-profile.data";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  user: IUser = reimis
  userProfile:IUserProfile = reimisProfile
  profileOwner: boolean = true
}
