import {Component, inject, OnInit} from '@angular/core';
import {IProject} from "../../../models/projects";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {ProjectsService} from "../../../services/projects.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/authentication";
import {IFireAuthorResponse} from "../../../models/actions";

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss',
})
export class ProjectManagementComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute)
  pageDataSubject$ = new BehaviorSubject<IProject | null>(null)
  pageData$: Observable<IProject | null> = this.pageDataSubject$.asObservable()
  loggedUser: IUser

  constructor(private projectsService: ProjectsService, private authService: AuthService) {
  }

  ngOnInit() {
    const pk = Number(this.route.snapshot.params['pk'])
    this.projectsService.getProject(pk).pipe(map(value => {
        if (value) {
          return {
            ...value,
            authors: value.authors.map(author => ({
              ...author,
              isFired: false
            }))
          }
        } else {
          return value
        }
      }),
      tap(value => this.pageDataSubject$.next(value))).subscribe()

    this.authService.getLoggedUser().subscribe((value: IUser | null) => {
      if (value) {
        this.loggedUser = value
      }
    })
  }

  onFireUser(slug: string) {
    console.log(`Уволен ${slug}`)
    const pk = Number(this.route.snapshot.params['pk'])
    this.projectsService.fireAuthor(pk, slug).pipe(tap((value: IFireAuthorResponse) => {
      if (value.success) {
        const currentData = this.pageDataSubject$.value
        if (currentData) {
          const updatedAuthors = currentData.authors.map(author => {
            if (author.user.userprofile.slug===value.fired_slug) {
              return {...author, isFired: true}
            }
            return author
          })
          this.pageDataSubject$.next({...currentData, authors: updatedAuthors})
        }
      }
    }), catchError((error) => {
      console.error('Ошибка при увольнении автора', error);
      return of(null);
    })).subscribe()
  }

}
