import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../core';
import { HeroService } from './hero.service';
import { ModalComponent } from '../shared/modal.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ListHeaderComponent } from '../shared/list-header.component';

@Component({
    selector: 'app-heroes',
    template: `
    <div class="content-container">
      <app-list-header
        title="Heroes"
        (add)="enableAddMode()"
        (refresh)="getHeroes()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="heroes$ | async as heroes">
          <app-hero-list
            *ngIf="!selected"
            [heroes]="heroes"
            (selected)="select($event)"
            (deleted)="askToDelete($event)"
          ></app-hero-list>
          <app-hero-detail
            *ngIf="selected"
            [hero]="selected"
            (unselect)="clear()"
            (save)="save($event)"
          ></app-hero-detail>
        </div>
      </div>

      <app-modal
        class="modal-hero"
        [message]="message"
        [isOpen]="showModal"
        (handleNo)="closeModal()"
        (handleYes)="deleteHero()"
      ></app-modal>
    </div>
  `,
    standalone: true,
    imports: [
        ListHeaderComponent,
        NgIf,
        HeroListComponent,
        HeroDetailComponent,
        ModalComponent,
        AsyncPipe,
    ],
})
export class HeroesComponent implements OnInit {
  selected: Hero;
  heroes$: Observable<Hero[]>;
  message = '?';
  heroToDelete: Hero;
  showModal = false;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.entities$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(hero: Hero) {
    this.heroService.add(hero);
  }

  askToDelete(hero: Hero) {
    this.heroToDelete = hero;
    this.showModal = true;
    if (this.heroToDelete.name) {
      this.message = `Would you like to delete ${this.heroToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteHero() {
    this.closeModal();
    if (this.heroToDelete) {
      this.heroService.delete(this.heroToDelete.id).subscribe(() => (this.heroToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getHeroes() {
    this.heroService.getAll();
    this.clear();
  }

  save(hero: Hero) {
    if (this.selected && this.selected.name) {
      this.update(hero);
    } else {
      this.add(hero);
    }
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  update(hero: Hero) {
    this.heroService.update(hero);
  }
}
