import {Component, inject, TemplateRef, ViewChild} from '@angular/core';

import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NavOffcanvasComponent} from "./nav-offcanvas/nav-offcanvas.component";

@Component({
  selector: 'my-nav-bar',
  standalone: true,
  imports: [NgbDatepickerModule, NavOffcanvasComponent],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild(NavOffcanvasComponent) private navOffcanvasComponent!: NavOffcanvasComponent;

  openOffcanvas() {
    this.navOffcanvasComponent.open(this.navOffcanvasComponent.content)
  }
}
