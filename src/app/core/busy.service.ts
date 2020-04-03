import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface BusyPayload {
  isBusy: boolean;
  message?: string;
}
const notBusyPayload: BusyPayload = { isBusy: false };

@Injectable({ providedIn: 'root' })
export class BusyService {
  private subject = new ReplaySubject<BusyPayload>();
  private busyCounter = 0;
  busyState$ = this.subject.asObservable();

  increment(message: string) {
    this.busyCounter++;
    const payload: BusyPayload = { isBusy: true, message };
    this.subject.next(payload);
  }

  decrement() {
    this.busyCounter--;
    if (this.busyCounter <= 0) {
      this.subject.next(notBusyPayload);
    }
  }
}
