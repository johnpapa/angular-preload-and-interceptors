import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface BusyPayload {
  isBusy: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class BusyService {
  private subject = new ReplaySubject<BusyPayload>();
  busyState$ = this.subject.asObservable();

  increment(message: string) {
    const payload: BusyPayload = { isBusy: true, message };
    this.subject.next(payload);
  }

  decrement() {
    const payload: BusyPayload = { isBusy: false };
    this.subject.next(payload);
    // this.subject.complete();
  }
}
