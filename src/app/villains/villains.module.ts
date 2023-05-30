import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  declarations: [VillainsComponent, VillainListComponent, VillainDetailComponent],
})
export class VillainsModule {}
