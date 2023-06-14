import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Movie } from '../core';
import { CardContentComponent } from '../shared/card-content.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-movie-list',
    template: `
    <ul class="list">
      <li role="presentation" *ngFor="let movie of movies; trackBy: trackByMovie; let i = index">
        <div class="card">
          <app-card-content [name]="movie.name" [description]="movie.description">
            <div class="description">{{ movie.year }}</div>
            <div class="description">{{ movie.length }}</div>
          </app-card-content>
        </div>
      </li>
    </ul>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, CardContentComponent],
})
export class MovieListComponent {
  @Input() movies: Movie[];

  trackByMovie(index: number, movie: Movie): number {
    return movie.id;
  }
}
