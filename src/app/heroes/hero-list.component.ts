import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../core';

@Component({
  selector: 'app-hero-list',
  template: `
    <ul class="list">
      <li *ngFor="let hero of heroes; trackBy: trackByHero; let i = index" role="presentation">
        <div class="card">
          <app-card-content [name]="hero.name" [description]="hero.description"></app-card-content>
          <footer class="card-footer">
            <app-button-footer
              class="card-footer-item"
              [className]="'delete-item'"
              [iconClasses]="'fas fa-trash'"
              (clicked)="deleteHero($event)"
              label="Delete"
              [item]="hero"
            ></app-button-footer>
            <app-button-footer
              class="card-footer-item"
              [className]="'edit-item'"
              [iconClasses]="'fas fa-edit'"
              (clicked)="selectHero($event)"
              label="Edit"
              [item]="hero"
            ></app-button-footer>
          </footer>
        </div>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  @Input() heroes: Hero[];
  @Output() deleted = new EventEmitter<Hero>();
  @Output() selected = new EventEmitter<Hero>();

  selectHero(hero: Hero) {
    this.selected.emit(hero);
  }

  deleteHero(hero: Hero) {
    this.deleted.emit(hero);
  }

  trackByHero(index: number, hero: Hero): string {
    return hero.id;
  }
}
