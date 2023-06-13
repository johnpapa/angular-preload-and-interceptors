import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';


const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), HeroesComponent, HeroListComponent, HeroDetailComponent],
    exports: [RouterModule],
})
export class HeroesModule {}
