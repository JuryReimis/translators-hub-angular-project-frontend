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
    title: 'Home page'
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.routes').then(m => m.routes),
    title: "Projects page"
  },
];
