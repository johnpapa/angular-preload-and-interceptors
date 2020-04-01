import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoginService } from './login.service';
import { UserProfileService } from '../user-profile.service';

@Component({
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Login</h2>
        <div>
          <p>Click here to log in. Who needs a password?</p>
          <button
            class="button is-dark btn-login"
            (click)="login()"
            *ngIf="!isLoggedIn"
          >
            Login
          </button>
          <button
            class="button is-dark btn-login"
            (click)="logout()"
            *ngIf="isLoggedIn"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  `,
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
  private subs = new Subscription();

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  public get isLoggedIn(): boolean {
    return this.userProfileService.isLoggedIn;
  }

  login() {
    this.subs.add(
      this.loginService
        .login()
        .pipe(
          mergeMap(loginResult => this.route.queryParams),
          map(qp => qp['redirectTo'])
        )
        .subscribe(redirectTo => {
          console.info(`Successfully logged in`);
          if (this.userProfileService.isLoggedIn) {
            const url = redirectTo ? [redirectTo] : ['/dashboard'];
            this.router.navigate(url);
          }
        })
    );
  }

  logout() {
    this.loginService.logout();
    console.info(`Successfully logged out`);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
