import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {IProject} from "../models/projects";
import {environment} from "../../environments/environment";
import {NEED_AUTH} from "../constants/auth.context-token";
import {IFireAuthorResponse} from "../models/actions";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectsList$: BehaviorSubject<IProject[]|null>
  project$: BehaviorSubject<IProject|null> = new BehaviorSubject<IProject | null>(null)

  constructor(private httpService: HttpClient) {}

  setProject(value: IProject) {
    this.project$.next(value)
  }

  getProject(pk: number) {
    if (this.project$ && this.project$.value?.pk === pk) {
      console.log('get project', this.project$.value)
      return this.project$.asObservable()
    }
    const context = new HttpContext().set(NEED_AUTH, false)
    return this.httpService.get<IProject>(`${environment.apiUrl}/get-project/${pk}/`, {context: context}).pipe(tap(
      value => {
        this.setProject(value)
      }
    ))
  }

  getProjectsList(filter?: string) {
    const context = new HttpContext().set(NEED_AUTH, false)
    return this.httpService.get<IProject[]>(`${environment.apiUrl}/get-projects-list/`, {context: context})
  }

  fireAuthor(pk: number, authorSlug: string) {
    const context = new HttpContext().set(NEED_AUTH, true)
    return this.httpService.patch<IFireAuthorResponse>(`${environment.apiUrl}/fire-author/`, {
      pk: pk,
      author_slug: authorSlug
    }, {context})
  }
}
