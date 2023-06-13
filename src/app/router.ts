import { Routes } from '@angular/router';
import {
  NotFoundComponent,
  SignInComponent,
  AuthFailedComponent,
  isAuthenticatedGuard,
} from './core';
import { authLoadGuard } from './core/guards/auth-load.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  {
    path: 'movies',
    loadChildren: () => import('./movies/routes').then((m) => m.routes),
    data: { preload: true },
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/routes').then((m) => m.routes),
    canActivate: [isAuthenticatedGuard],
    data: { preload: true },
  },
  {
    path: 'villains',
    loadChildren: () => import('./villains/routes').then((m) => m.routes),
    /**
     * Remove the guard and you can route to villains,
     * but you still can't get to the data unless you are logged in
     */
    canActivate: [isAuthenticatedGuard],
    // data: { preload: true },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes').then((m) => m.routes),
    canMatch: [authLoadGuard],
    // data: { preload: true },
  },
  {
    path: 'about',
    loadChildren: () => import('./about/routes').then((m) => m.routes),
  },
  { path: 'signin', component: SignInComponent },
  { path: 'authfailed', component: AuthFailedComponent },
  { path: '**', component: NotFoundComponent },
];
