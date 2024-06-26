import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {IProject} from "../../models/projects";
import {IUser} from "../../models/authentication";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {ProjectDataService} from "./project-data.service";


@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute)
  slug: string = ''
  moderator: boolean = true
  pageData: IProject
  groupedRoles:Record<string, IUser[]>

  constructor(private pageService: ProjectDataService) {
  }

  groupUsersByRoles(): Record<string, IUser[]> {
    return this.pageData.authors.reduce((acc, author) => {
      const { role, user } = author;
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(user);
      return acc;
    }, {} as Record<string, IUser[]>);
  }

  protected readonly Object = Object;

  ngOnInit() {
    this.slug = String(this.route.snapshot.params['slug'])
    this.pageData = this.pageService.getData(this.slug)
    this.groupedRoles = this.groupUsersByRoles()
  }
}
