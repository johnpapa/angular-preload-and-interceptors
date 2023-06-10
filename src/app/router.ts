import { Routes } from '@angular/router';
import { NotFoundComponent, SignInComponent, AuthFailedComponent, authGuard } from './core';
import { authLoadGuard } from './core/guards/auth-load.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule),
    data: { preload: true },
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then((m) => m.HeroesModule),
    canActivate: [authGuard],
    data: { preload: true },
  },
  {
    path: 'villains',
    loadChildren: () => import('./villains/villains.module').then((m) => m.VillainsModule),
    /**
     * Remove the guard and you can route to villains,
     * but you still can't get to the data unless you are logged in
     */
    canActivate: [authGuard],
    // data: { preload: true },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canMatch: [authLoadGuard],
    // data: { preload: true },
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
  },
  { path: 'signin', component: SignInComponent },
  { path: 'authfailed', component: AuthFailedComponent },
  { path: '**', component: NotFoundComponent },
];
