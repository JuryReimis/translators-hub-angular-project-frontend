import {Routes} from "@angular/router";
import {DetailPageComponent} from "./detail-page.component";


export const routes: Routes = [
  {
    path: '',
    component: DetailPageComponent,
    title: "Detail page"
  },
  {
    path: 'project-management',
    loadChildren: () => import('./project-management/project-management.routes').then(m => m.routes),
  }
]
