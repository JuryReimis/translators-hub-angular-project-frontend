import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IProject} from "../../models/projects";
import {IUser} from "../../models/authentication";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {ProjectsService} from "../../services/projects.service";
import {Observable} from "rxjs";


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
  pk: string
  moderator: boolean = true
  pageData$: Observable<IProject>

  constructor(private projectService: ProjectsService) {
  }

  protected readonly Object = Object;

  ngOnInit() {
    this.pk = String(this.route.snapshot.params['pk'])
    this.pageData$ = this.projectService.getProject(this.pk)
  }
}
