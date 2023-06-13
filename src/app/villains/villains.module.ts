import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VillainDetailComponent } from './villain-detail.component';
import { VillainListComponent } from './villain-list.component';
import { VillainsComponent } from './villains.component';
import { canDeactivateGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: VillainsComponent,
    canDeactivate: [canDeactivateGuard],
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VillainsComponent, VillainListComponent, VillainDetailComponent],
    exports: [RouterModule],
})
export class VillainsModule {}
