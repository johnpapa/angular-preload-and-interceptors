import { Routes } from '@angular/router';
import { NotFoundComponent, AuthGuard, LoginComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then(m => m.HeroesModule),
    data: { preload: true }
  },
  {
    path: 'villains',
    loadChildren: () =>
      import('./villains/villains.module').then(m => m.VillainsModule),
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
  { path: '**', component: NotFoundComponent }
];
