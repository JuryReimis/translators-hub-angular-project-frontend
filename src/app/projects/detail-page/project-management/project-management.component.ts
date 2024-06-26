import {Component, inject, OnInit} from '@angular/core';
import {ProjectDataService} from "../project-data.service";
import {IProject} from "../../../models/projects";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss',
})
export class ProjectManagementComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute)
  slug: string
  pageData: IProject

  constructor(private pageService: ProjectDataService) {}

  ngOnInit() {
    this.slug = String(this.route.snapshot.params['slug'])
    this.pageData = this.pageService.getData(this.slug)
  }

}
