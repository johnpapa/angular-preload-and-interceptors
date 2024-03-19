import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../busy.service';
import { finalize } from 'rxjs/operators';
import { prefixReq, prefixRes } from './http-config';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const msg = req.method === 'GET' ? 'Loading ...' : 'Saving ...';
    console.groupCollapsed(`${prefixReq} ⚙️ Busy Spinner`);
    console.log(msg);
    console.groupEnd();
    this.busyService.increment(msg);
    return next.handle(req).pipe(
      finalize(() => {
        this.busyService.decrement();
        console.groupCollapsed(`${prefixRes} ⚙️ Busy Spinner`);
        console.log('Decrementing');
        console.groupEnd();
      })
    );
  }
}

export const BusyFunctionalInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const msg = req.method === 'GET' ? 'Loading ...' : 'Saving ...';
  console.groupCollapsed(`${prefixReq} ⚙️ Busy Spinner - Functional`);
  console.log(msg);
  console.groupEnd();
  const busyService = inject(BusyService);
  busyService.increment(msg);
  return next(req).pipe(
    finalize(() => {
      busyService.decrement();
      console.groupCollapsed(`${prefixRes} ⚙️ Busy Spinner - Functional`);
      console.log('Decrementing');
      console.groupEnd();
    })
  );
};
