import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IProject, IRoles, ISortedRoles} from "../../models/projects";
import {IUser} from "../../models/authentication";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {ProjectsService} from "../../services/projects.service";
import {Observable, tap} from "rxjs";


@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute)
  pk: number
  moderator: boolean = true
  pageData$: Observable<IProject|null>
  sortedRoles: ISortedRoles

  constructor(private projectService: ProjectsService) {
  }

  protected readonly Object = Object;

  ngOnInit() {
    this.pk = Number(this.route.snapshot.params['pk'])
    this.pageData$ = this.projectService.getProject(this.pk).pipe(tap(
      (value: IProject|null) => {
        if (value) {
          this.sortedRoles = this.sortAuthorsByRoles(value.authors)
        }
      }
    ))
  }


  sortAuthorsByRoles(authors: IRoles[]): ISortedRoles {

    const sortedAuthors: ISortedRoles = new class implements ISortedRoles {
      [key: string]: any;

      mdr: IUser[];
      org: IUser[];
      trs: IUser[];
      tst: IUser[];
    };

    authors.forEach((author: IRoles) => {
      const role = author.role;
      const user = author.user;

      // Если роль еще не существует в sortedAuthors, добавляем ее
      if (!sortedAuthors[role]) {
        sortedAuthors[role] = [];
      }

      // Добавляем пользователя в соответствующую роль
      sortedAuthors[role].push(user);
    });
    return sortedAuthors;
  }
}
