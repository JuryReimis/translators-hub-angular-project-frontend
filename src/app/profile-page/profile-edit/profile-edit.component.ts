import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/authentication";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit{

  private slug: string
  private user$: Observable<IUser>

  public userProfileForm: FormGroup

  constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder,
              ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug']
      this.user$ = this.userService.getUserBySlug(this.slug)
    })
    this.user$.subscribe((user: IUser) => {
      this.userProfileForm = this.fb.group({
        username: [user.username, Validators.required],
        first_name: [user.first_name, Validators.required],
        last_name: [user.last_name, Validators.required],
        userprofile: this.fb.group({
          description: [user.userprofile.description],
          experience: [user.userprofile.experience],
          profile_image: [user.userprofile.profile_image]
        })
      })
    })
  }

  onSubmit() {

    if (this.userProfileForm.valid) {
      console.log(this.userProfileForm.value)
      this.userService.updateUserData(this.slug, this.userProfileForm.value).subscribe(response => {
        console.log(response)
      })
    }
    else {
      console.log('form invalid', this.userProfileForm.errors)
    }
  }

}
