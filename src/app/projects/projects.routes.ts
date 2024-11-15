import {Routes} from "@angular/router";
import {ProjectsComponent} from "./projects.component";


export const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    title: "Projects page"
  },
  {
    path: ':pk',
    loadChildren: () => import('./detail-page/detail-page.routes').then(m => m.routes),
    title: "Detail page"
  }
]
