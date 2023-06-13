import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, Villain } from '../core';
import { VillainService } from './villain.service';
import { ModalComponent } from '../shared/modal.component';
import { VillainDetailComponent } from './villain-detail.component';
import { VillainListComponent } from './villain-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ListHeaderComponent } from '../shared/list-header.component';

@Component({
    selector: 'app-villains',
    template: `
    <div class="content-container">
      <app-list-header
        title="Villains"
        (add)="enableAddMode()"
        (refresh)="getVillains()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="villains$ | async as villains">
          <app-villain-list
            *ngIf="!selected"
            [villains]="villains"
            (selected)="select($event)"
            (deleted)="askToDelete($event)"
          ></app-villain-list>
          <app-villain-detail
            *ngIf="selected"
            [villain]="selected"
            (unselect)="clear()"
            (save)="save($event)"
          ></app-villain-detail>
        </div>
      </div>

      <app-modal
        class="modal-villain"
        [message]="message"
        [isOpen]="showModal"
        (handleNo)="closeModal()"
        (handleYes)="deleteVillain()"
      ></app-modal>
    </div>
  `,
    standalone: true,
    imports: [
        ListHeaderComponent,
        NgIf,
        VillainListComponent,
        VillainDetailComponent,
        ModalComponent,
        AsyncPipe,
    ],
})
export class VillainsComponent implements OnInit, CanComponentDeactivate {
  selected: Villain;
  villains$: Observable<Villain[]>;
  message = '?';
  villainToDelete: Villain;
  showModal = false;

  constructor(private villainService: VillainService) {
    this.villains$ = villainService.entities$;
  }

  ngOnInit() {
    this.getVillains();
  }

  canDeactivate() {
    // TODO: implement your logic here
    let isOk = true;
    return isOk;
  }

  add(villain: Villain) {
    this.villainService.add(villain);
  }

  askToDelete(villain: Villain) {
    this.villainToDelete = villain;
    this.showModal = true;
    if (this.villainToDelete.name) {
      this.message = `Would you like to delete ${this.villainToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteVillain() {
    this.closeModal();
    if (this.villainToDelete) {
      this.villainService
        .delete(this.villainToDelete.id)
        .subscribe(() => (this.villainToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getVillains() {
    this.villainService.getAll();
    this.clear();
  }

  save(villain: Villain) {
    if (this.selected && this.selected.name) {
      this.update(villain);
    } else {
      this.add(villain);
    }
  }

  select(villain: Villain) {
    this.selected = villain;
  }

  update(villain: Villain) {
    this.villainService.update(villain);
  }
}
