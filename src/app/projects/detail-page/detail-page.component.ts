import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {IProject} from "../../models/projects";
import {project1} from "../../data/project.data";
import {IUser} from "../../models/authentication";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  slug: string = ''
  moderator: boolean = true
  pageData: IProject = project1
  groupedRoles = this.groupUsersByRoles()

  constructor() {
    this.slug = String(this.route.snapshot.params['slug'])
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
}
