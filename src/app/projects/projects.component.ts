import {Component, OnInit} from '@angular/core';
import {IProject} from "../models/projects";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TruncateCharsPipe} from "../pipes/truncate-chars.pipe";
import {DetailPageComponent} from "./detail-page/detail-page.component";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {ProjectsService} from "../services/projects.service";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TruncateCharsPipe,
    DetailPageComponent,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

  projects_list: Observable<IProject[]>

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projects_list = this.projectsService.getProjectsList()
  }


}
