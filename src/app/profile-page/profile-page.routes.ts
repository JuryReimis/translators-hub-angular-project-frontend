import {Routes} from "@angular/router";
import {ProfilePageComponent} from "./profile-page.component";


export const routes: Routes = [
  {
    path: ':slug',
    component: ProfilePageComponent,
    title: 'Profile page',
    pathMatch: 'full'
  },
  {
    path: ':slug/edit',
    loadChildren: () => import('./profile-edit/profile-edit.routes').then(m => m.routes)
  }
]
