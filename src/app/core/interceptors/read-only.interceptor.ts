import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { prefixReq, prefixRes } from './http-config';
import { SessionService } from '../session.service';

@Injectable()
export class ReadOnlyInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const readOnly = this.sessionService.readOnly;
    if (!readOnly || this.okIfReadOnly(req)) {
      console.groupCollapsed(`${prefixReq} 👓 Read-Only`);
      console.log(`Data is not read-only`);
      console.groupEnd();
      return next.handle(req);
    } else {
      const msg = `Can't ${req.method} ${req.url} when read-only`;
      console.groupCollapsed(`${prefixReq} Read-Only`);
      console.error(msg);
      console.groupEnd();
      return throwError(new Error(msg));
    }
  }

  okIfReadOnly(req: HttpRequest<any>) {
    /**
     * Put allowList of readonly routes here
     */
    const allowList = [/api\/heroes/gi];
    return allowList.some((item) => item.test(req.url));
  }
}
