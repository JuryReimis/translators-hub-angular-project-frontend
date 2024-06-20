import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {HomeComponent} from "./home/home.component";
import {DOCUMENT} from "@angular/common";
import {ProjectsComponent} from "./projects/projects.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HomeComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  navHeight: number = 0
  title = 'django-project-frontend';

  ngOnInit() {
    this.navHeight = this.element.nativeElement.querySelector('.navbar').offsetHeight
    this.updateBodyPadding(this.navHeight)
  }

  updateBodyPadding(padding: number = 0): void {
    this.document.body.style.paddingTop = `${padding}px`
  }
}
