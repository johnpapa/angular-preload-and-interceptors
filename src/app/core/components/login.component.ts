import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SessionService } from '../session.service';

@Component({
  template: `
    <div class="card login">
      <header class="card-header">
        <p class="card-header-title">
          Sign In
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label" for="email">
              email
            </label>
            <input
              name="email"
              class="input"
              type="email"
              [(ngModel)]="email"
              placeholder="e.g. john@contoso.com"
            />
          </div>
          <div class="field">
            <label class="label" for="password">
              Password
            </label>
            <input
              name="password"
              class="input"
              type="password"
              [(ngModel)]="password"
              placeholder="1234"
            />
          </div>
        </div>
      </div>
      <footer class="card-footer ">
        <app-button-footer
          class="card-footer-item"
          [className]="'cancel-button'"
          [iconClasses]="'fas fa-sign-out-alt'"
          (clicked)="logout()"
          label="Logout"
        ></app-button-footer>
        <app-button-footer
          class="card-footer-item"
          [className]="'save-button'"
          [iconClasses]="'fas fa-sign-in-alt'"
          (clicked)="login()"
          label="Login"
        ></app-button-footer>
      </footer>
    </div>
  `
})
export class LoginComponent implements OnDestroy {
  private subs = new Subscription();
  email: string = 'john@contoso.com';
  password: string = '1234';

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public get isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn;
  }

  login() {
    this.subs.add(
      this.sessionService
        .login(this.email, this.password)
        .pipe(
          mergeMap(result => this.route.queryParams),
          map(qp => qp['redirectTo'])
        )
        .subscribe(redirectTo => {
          if (this.sessionService.isLoggedIn) {
            console.info(`Successfully logged in`);
            const url = redirectTo ? [redirectTo] : ['/heroes'];
            this.router.navigate(url);
          }
        })
    );
  }

  logout() {
    this.sessionService.logout();
    console.info(`Successfully logged out`);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
