import {
  Component,
  inject,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../models/authentication";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'nav-offcanvas',
  standalone: true,
  imports: [NgbDatepickerModule, NgIf, RouterLink, AsyncPipe],
  templateUrl: 'nav-offcanvas.component.html',
})
export class NavOffcanvasComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  authenticationTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)

  @ViewChild('content') content!: TemplateRef<any>
  private loggedUser$: Observable<IUser|null>

  @Output() open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      scroll: true,
      position: "end",
      ariaLabelledBy: 'offcanvas-basic-title'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loggedUser$ = this.authService.getLoggedUser()
    this.loggedUser$.subscribe(value => {
      this.user$.next(value)
      if (value) {
        this.authenticationTitle$.next(value.username)
      }
      else {
        this.authenticationTitle$.next('Login/Registration')
      }
    })
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

  closeOffcanvas(reason?: any) {
    this.offcanvasService.dismiss(reason)
  }

  logout() {
    this.authService.logOut().subscribe(result => {
      this.offcanvasService.dismiss(result)
    })
  }
}
