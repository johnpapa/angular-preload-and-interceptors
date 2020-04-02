import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';

@Injectable()
export class EnsureSSLInterceptor implements HttpInterceptor {
  /**
   * Credit: https://angular.io/guide/http#http-interceptors
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const secureReq = req.clone({
      url: req.url.replace('http://', 'https://')
    });
    // send the cloned, "secure" request to the next handler.
    console.groupCollapsed(`${prefixReq} SSL`);
    console.log(`Rerouting all traffic to SSL`);
    console.groupEnd();
    return next.handle(secureReq);
  }
}
