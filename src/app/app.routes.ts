import { Routes } from '@angular/router';

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
