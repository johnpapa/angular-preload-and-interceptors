import { Component } from '@angular/core';

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
})
export class AuthFailedComponent {}
