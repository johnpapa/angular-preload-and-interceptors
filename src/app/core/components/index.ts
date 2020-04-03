export * from './auth-failed.component';
export * from './header-bar.component';
export * from './header-bar-brand.component';
export * from './header-bar-links.component';
export * from './login.component';
export * from './nav.component';
export * from './not-found.component';

import { AuthFailedComponent } from './auth-failed.component';
import { HeaderBarBrandComponent } from './header-bar-brand.component';
import { HeaderBarLinksComponent } from './header-bar-links.component';
import { HeaderBarComponent } from './header-bar.component';
import { LoginComponent } from './login.component';
import { NavComponent } from './nav.component';
import { NotFoundComponent } from './not-found.component';

export const declarations = [
  AuthFailedComponent,
  NavComponent,
  HeaderBarComponent,
  HeaderBarBrandComponent,
  HeaderBarLinksComponent,
  LoginComponent,
  NotFoundComponent
];
