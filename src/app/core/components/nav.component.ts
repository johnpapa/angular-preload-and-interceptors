import { Component } from '@angular/core';
import { OnDemandPreloadService } from '../strategies';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
        <a routerLink="/signin" routerLinkActive="router-link-active">
          <span>Sign in</span>
        </a>
      </ul>
      <div>
        <button class="button is-dark btn-preload-all" (click)="preloadAll()">Preload All</button>
      </div>
    </nav>
  `,
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
})
export class NavComponent {
  constructor(private preloadOnDemandService: OnDemandPreloadService) {}

  preloadAll() {
    this.preloadOnDemandService.startPreload('*');
  }

  preloadBundle(routePath) {
    this.preloadOnDemandService.startPreload(routePath);
  }
}
