import { Component } from '@angular/core';
import { BusyService } from './core/busy.service';
import { delay } from 'rxjs/operators';

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
  `
})
export class AppComponent {
  busy = false;

  constructor(private busyService: BusyService) {
    this.busyService.busyState$.pipe(delay(0)).subscribe(bs => (this.busy = bs.isBusy));
  }
}
