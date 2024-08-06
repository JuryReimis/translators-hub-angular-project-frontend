import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.routes),
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.routes').then(m => m.routes),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.routes').then(m => m.routes),
  }
];
