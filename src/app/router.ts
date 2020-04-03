import { Routes } from '@angular/router';
import { NotFoundComponent, AuthGuard, LoginComponent, AuthFailedComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    data: { preload: true }
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'villains',
    loadChildren: () => import('./villains/villains.module').then(m => m.VillainsModule),
    // canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'authfailed', component: AuthFailedComponent },
  { path: '**', component: NotFoundComponent }
];
