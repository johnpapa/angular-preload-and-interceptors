import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Auth Failed</h2>
        <div>
          <p>Authorization Failed</p>
          <a routerLink="/signin">
            <span>Try to log in</span>
          </a>
        </div>
      </div>
    </div>
  `,
    standalone: true,
    imports: [RouterLink],
})
export class AuthFailedComponent {}
