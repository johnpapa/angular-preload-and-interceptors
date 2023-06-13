import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from '../session.service';

@Component({
    selector: 'app-header-bar-brand',
    template: `
    <div class="navbar-brand">
      <a class="navbar-item" href="https://angular.io/" target="_blank" rel="noopener noreferrer">
        <i class="fab js-logo fa-angular fa-2x" aria-hidden="true"></i>
      </a>
      <a class="navbar-item nav-home" router-link="/">
        <span class="tour">TOUR</span> <span class="of">OF</span>
        <span class="heroes">HEROES</span>
      </a>
      <div class="navbar-signin-state">
        {{ signinState }}
      </div>
      <button
        class="link navbar-burger burger "
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarLinks"
      >
        <span aria-hidden="true"></span> <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
  `,
    standalone: true,
})
export class HeaderBarBrandComponent implements OnDestroy {
  private subs = new Subscription();
  signinState: string;

  constructor(private sessionService: SessionService) {
    this.subs.add(
      this.sessionService.sessionState$.subscribe((state) => (this.signinState = state.message))
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
