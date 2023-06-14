import { Component } from '@angular/core';
import { HeaderBarLinksComponent } from './header-bar-links.component';
import { HeaderBarBrandComponent } from './header-bar-brand.component';

@Component({
    selector: 'app-header-bar',
    template: `
    <header>
      <nav
        class="navbar has-background-dark is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <app-header-bar-brand></app-header-bar-brand>
        <app-header-bar-links></app-header-bar-links>
      </nav>
    </header>
  `,
    standalone: true,
    imports: [HeaderBarBrandComponent, HeaderBarLinksComponent],
})
export class HeaderBarComponent {}
