import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Villain } from '../core';
import { ButtonFooterComponent } from '../shared/button-footer.component';
import { CardContentComponent } from '../shared/card-content.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-villain-list',
    template: `
    <ul class="list">
      <li
        role="presentation"
        *ngFor="let villain of villains; trackBy: trackByVillain; let i = index"
      >
        <div class="card">
          <app-card-content
            [name]="villain.name"
            [description]="villain.description"
          ></app-card-content>
          <footer class="card-footer">
            <app-button-footer
              class="card-footer-item"
              [className]="'delete-item'"
              [iconClasses]="'fas fa-trash'"
              (clicked)="deleteVillain($event)"
              label="Delete"
              [item]="villain"
            ></app-button-footer>
            <app-button-footer
              class="card-footer-item"
              [className]="'edit-item'"
              [iconClasses]="'fas fa-edit'"
              (clicked)="selectVillain($event)"
              label="Edit"
              [item]="villain"
            ></app-button-footer>
          </footer>
        </div>
      </li>
    </ul>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgFor,
        CardContentComponent,
        ButtonFooterComponent,
    ],
})
export class VillainListComponent {
  @Input() villains: Villain[];
  @Output() deleted = new EventEmitter<Villain>();
  @Output() selected = new EventEmitter<Villain>();

  trackByVillain(index: number, villain: Villain): string {
    return villain.id;
  }

  selectVillain(villain: Villain) {
    this.selected.emit(villain);
  }

  deleteVillain(villain: Villain) {
    this.deleted.emit(villain);
  }
}
