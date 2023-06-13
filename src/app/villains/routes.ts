import { Routes } from '@angular/router';

import { VillainsComponent } from './villains.component';
import { canDeactivateGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: VillainsComponent,
    canDeactivate: [canDeactivateGuard],
  },
];
