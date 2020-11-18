import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Hero } from '../core';

@Component({
  selector: 'app-hero-detail',
  template: `
    <div class="card edit-detail">
      <header class="card-header">
        <p class="card-header-title">
          {{ editingHero.name }}
          &nbsp;
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field" *ngIf="editingHero.id">
            <label class="label" for="id"> id </label>
            <input
              name="id"
              class="input"
              type="text"
              [(ngModel)]="editingHero.id"
              placeholder="e.g. HeroColleen"
              readOnly
            />
          </div>
          <div class="field">
            <label class="label" for="name"> name </label>
            <input
              name="name"
              class="input"
              type="text"
              [(ngModel)]="editingHero.name"
              placeholder="e.g. Colleen"
            />
          </div>
          <div class="field">
            <label class="label" for="description"> description </label>
            <input
              name="description"
              class="input"
              type="text"
              [(ngModel)]="editingHero.description"
              placeholder="dance fight!"
            />
          </div>
        </div>
      </div>
      <footer class="card-footer ">
        <app-button-footer
          class="card-footer-item"
          [className]="'cancel-button'"
          [iconClasses]="'fas fa-undo'"
          (clicked)="clear()"
          label="Cancel"
          [item]="editingHero"
        ></app-button-footer>
        <app-button-footer
          class="card-footer-item"
          [className]="'save-button'"
          [iconClasses]="'fas fa-save'"
          (clicked)="saveHero()"
          label="Save"
          [item]="editingHero"
        ></app-button-footer>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Hero>();

  addMode = false;
  editingHero: Hero;

  ngOnChanges(changes: SimpleChanges) {
    if (this.hero && this.hero.id) {
      this.editingHero = { ...this.hero };
      this.addMode = false;
    } else {
      this.editingHero = { id: undefined, name: '', description: '' };
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveHero() {
    this.save.emit(this.editingHero);
    this.clear();
  }
}
