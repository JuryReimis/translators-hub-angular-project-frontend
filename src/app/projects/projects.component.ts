import { Component } from '@angular/core';
import {IProject} from "../models/projects";
import {NgForOf, NgIf} from "@angular/common";
import {TruncateCharsPipe} from "../pipes/truncate-chars.pipe";
import {projectList} from "../data/project.data";
import {DetailPageComponent} from "./detail-page/detail-page.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TruncateCharsPipe,
    DetailPageComponent
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

  projects_list: IProject[] = projectList

}
