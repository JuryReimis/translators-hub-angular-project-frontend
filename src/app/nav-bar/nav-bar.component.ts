import {Component, ViewChild} from '@angular/core';

import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NavOffcanvasComponent} from "./nav-offcanvas/nav-offcanvas.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'my-nav-bar',
  standalone: true,
  imports: [NgbDatepickerModule, NavOffcanvasComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild(NavOffcanvasComponent) private navOffcanvasComponent!: NavOffcanvasComponent;

  openOffcanvas() {
    this.navOffcanvasComponent.open(this.navOffcanvasComponent.content)
  }
}
