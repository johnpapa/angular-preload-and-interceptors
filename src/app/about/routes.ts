import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];
