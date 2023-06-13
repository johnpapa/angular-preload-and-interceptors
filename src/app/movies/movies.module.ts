import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './movie-list.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MoviesComponent, MovieListComponent],
    exports: [RouterModule],
})
export class MoviesModule {}
