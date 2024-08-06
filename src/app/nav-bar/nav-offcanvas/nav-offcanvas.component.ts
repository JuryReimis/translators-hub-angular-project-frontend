import {Component, inject, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';

import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserProfileService} from "../../services/user-profile.service";
import {AuthService} from "../../services/auth.service";
import {IUser, IUserProfile} from "../../models/authentication";

@Component({
  selector: 'nav-offcanvas',
  standalone: true,
  imports: [NgbDatepickerModule, NgIf, RouterLink],
  templateUrl: 'nav-offcanvas.component.html',
})
export class NavOffcanvasComponent implements OnInit{
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  @Output() authenticationStatus: string = ''

  private authToken: string
  userLogged: boolean = false
  private user: IUser
  private userProfile: IUserProfile
  private router: Router

  @ViewChild('content') content!: TemplateRef<any>

  @Output() open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {scroll: true, position: "end", ariaLabelledBy: 'offcanvas-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  constructor(private userProfileService: UserProfileService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authToken = this.authService.getToken()
    if (this.authToken) {
      this.userProfileService.getUserByToken(this.authToken).subscribe(userData => {
        this.user = userData.user
        this.userProfile = userData.userProfile
        this.authenticationStatus = this.user.username
        this.userLogged = true
      })
    }
    else {
      this.authenticationStatus = "Login/Registration"
    }
  }

  openLoginModal() {
    this.authService.openLoginWindow()
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
