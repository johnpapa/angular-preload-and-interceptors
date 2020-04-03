import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionService {
  isLoggedIn = false;
  readOnly = true;

  login() {
    return of(true).pipe(delay(1000), tap(this.toggleLogState.bind(this)));
  }

  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    this.isLoggedIn = val;
  }

  getAuthorizationToken() {
    return [
      'Basic your-token-goes-here'
      // 'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      // 'Accept': 'application/json;odata=verbose'
    ];
  }
}
