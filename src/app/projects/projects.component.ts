import { Component } from '@angular/core';
import {IProject} from "../models/projects";
import {NgForOf, NgIf} from "@angular/common";
import {TruncateCharsPipe} from "../pipes/truncate-chars.pipe";
import {projectList} from "../data/project.data";
import {DetailPageComponent} from "./detail-page/detail-page.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TruncateCharsPipe,
    DetailPageComponent,
    RouterLink
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

  projects_list: IProject[] = projectList

}
