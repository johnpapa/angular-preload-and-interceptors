import { Component, OnDestroy } from '@angular/core';
import { OnDemandPreloadService } from '../strategies';
import { Subscription } from 'rxjs';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a
          routerLink="/movies"
          routerLinkActive="router-link-active"
          (mouseover)="preloadBundle('movies')"
        >
          <span>Movies</span>
        </a>
        <a
          routerLink="/heroes"
          routerLinkActive="router-link-active"
          (mouseover)="preloadBundle('heroes')"
        >
          <span>Heroes</span>
        </a>
        <a
          routerLink="/villains"
          routerLinkActive="router-link-active"
          (mouseover)="preloadBundle('villains')"
        >
          <span>Villains</span>
        </a>
        <a
          routerLink="/admin"
          routerLinkActive="router-link-active"
          (mouseover)="preloadBundle('admin')"
        >
          <span>Admin</span>
        </a>
        <a
          routerLink="/about"
          routerLinkActive="router-link-active"
          (mouseover)="preloadBundle('about')"
        >
          <span>About</span>
        </a>
        <a routerLink="/login" routerLinkActive="router-link-active">
          <span>Login</span>
        </a>
      </ul>
      <div>
        <p class="session-state">
          {{ loginState }}
        </p>
      </div>
      <div>
        <button class="button is-dark btn-preload-all" (click)="preloadAll()">
          Preload All
        </button>
      </div>
    </nav>
  `
})
export class NavComponent implements OnDestroy {
  private subs = new Subscription();
  loginState: string;

  constructor(
    private preloadOnDemandService: OnDemandPreloadService,
    private sessionService: SessionService
  ) {
    this.subs.add(
      this.sessionService.sessionState$.subscribe(
        state => (this.loginState = `Logged ${state ? 'in' : 'out'}`)
      )
    );
  }

  preloadAll() {
    this.preloadOnDemandService.startPreload('*');
  }

  preloadBundle(routePath) {
    this.preloadOnDemandService.startPreload(routePath);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
