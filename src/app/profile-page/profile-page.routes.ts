import {Routes} from "@angular/router";
import {ProfilePageComponent} from "./profile-page.component";


export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    title: 'Profile page'
  },
  {
    path: ':slug',
    loadChildren: () => import('./profile-edit/profile-edit.routes').then(m => m.routes)
  }
]
