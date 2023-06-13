import { Component } from '@angular/core';
import { BusyService } from './core/busy.service';
import { delay, observeOn } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav.component';
import { HeaderBarComponent } from './core/components/header-bar.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header-bar></app-header-bar>
      <div class="section columns">
        <app-nav class="column is-2"></app-nav>
        <main class="column">
          <div [hidden]="!busy">
            <progress class="progress is-medium is-info" max="100">45%</progress>
          </div>
          <div [hidden]="busy">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  standalone: true,
  imports: [HeaderBarComponent, NavComponent, RouterOutlet],
})
export class AppComponent {
  busy = false;

  constructor(private busyService: BusyService) {
    // busyService.busyState$.pipe(delay(0)).subscribe((bs) => (this.busy = bs.isBusy));

    busyService.busyState$
      // asapScheduler ensures this is async; remove this and look in console to see nasty error without this
      // ExpressionChangedAfterItHasBeenCheckedError
      .pipe(observeOn(asapScheduler))
      .subscribe((bs) => (this.busy = bs.isBusy));
  }
}
