import {Injectable} from "@angular/core";
import {IProject} from "../../models/projects";
import {project1} from "../../data/project.data";


@Injectable(
  {
    providedIn: "root"
  }
)
export class ProjectDataService {

  projectData: IProject
  slug: string

  getData(slug: string):IProject {
    if (!this.projectData || !(slug === this.slug)) {
      this.projectData = project1
      this.slug = slug
      console.log("Get data from server")
    } else {
      console.log("Get data from service")
    }
    return this.projectData
  }
}
