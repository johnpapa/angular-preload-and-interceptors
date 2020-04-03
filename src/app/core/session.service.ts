import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionStateSubject = new BehaviorSubject<boolean>(false);
  accessToken: string;
  isLoggedIn = false;
  readOnly = false;
  sessionState$ = this.sessionStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const root = environment.API;
    const loginUrl = `${root}/login/`;
    const body: Partial<User> = {
      email, // 'john@contoso.com',
      password // '1234'
    };
    return this.http.post<{ accessToken: string }>(loginUrl, body).pipe(
      map(res => {
        if (res?.accessToken) {
          this.accessToken = res.accessToken;
          this.sessionStateSubject.next(true);
          this.isLoggedIn = true;
          return true;
        } else {
          this.sessionStateSubject.next(false);
          this.isLoggedIn = false;
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
    this.sessionStateSubject.next(false);
    this.isLoggedIn = false;
  }
}
