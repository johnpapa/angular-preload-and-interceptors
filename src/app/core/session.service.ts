import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './model';
import { BehaviorSubject } from 'rxjs';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

const notSignedInMessage = `Not signed in`;

@Injectable({ providedIn: 'root' })
export class SessionService {
  private _isLoggedIn = false;
  private sessionStateSubject = new BehaviorSubject<SessionState>({
    loggedIn: false,
    message: notSignedInMessage
  });
  accessToken: string;

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  readOnly = false;
  sessionState$ = this.sessionStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  signin(email: string, password: string) {
    const root = environment.API;
    const signinUrl = `${root}/signin/`;
    const body: Partial<User> = {
      email, // 'john@contoso.com',
      password // '1234'
    };
    return this.http.post<{ accessToken: string }>(signinUrl, body).pipe(
      map(res => {
        if (res?.accessToken) {
          const message = `Welcome ${email}`;
          this.accessToken = res.accessToken;
          this.sessionStateSubject.next({ loggedIn: true, message });
          this._isLoggedIn = true;
          return true;
        } else {
          this.logout();
          return false;
        }
      })
    );
  }

  refreshToken() {
    // TODO: implement a refresh
  }

  logout() {
    this.accessToken = null;
    this.sessionStateSubject.next({ loggedIn: false, message: notSignedInMessage });
    this._isLoggedIn = false;
  }
}
