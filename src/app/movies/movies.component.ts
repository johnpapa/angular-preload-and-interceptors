import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../core';
import { MovieService } from './movie.service';
import { MovieListComponent } from './movie-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ListHeaderComponent } from '../shared/list-header.component';

@Component({
    selector: 'app-movies',
    template: `
    <div class="content-container">
      <app-list-header title="Movies" [showAdd]="false" (refresh)="getMovies()"></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="movies$ | async as movies">
          <app-movie-list [movies]="movies"></app-movie-list>
        </div>
      </div>
    </div>
  `,
    standalone: true,
    imports: [
        ListHeaderComponent,
        NgIf,
        MovieListComponent,
        AsyncPipe,
    ],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = movieService.entities$;
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAll();
  }
}
