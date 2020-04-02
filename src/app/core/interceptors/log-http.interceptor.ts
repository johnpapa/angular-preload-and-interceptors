import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    this.logRequest(req);
    return next.handle(req).pipe(tap(event => this.logResponse(event, req, started)));
  }

  private logRequest(req: HttpRequest<any>) {
    console.group('HTTP: Log Http Request');
    console.log(`${req.method} "${req.urlWithParams}"`);
    console.groupEnd();
  }

  private logResponse(event: HttpEvent<any>, req: HttpRequest<any>, started: number) {
    if (event instanceof HttpResponse) {
      console.group('******HTTP: Log Http Response');
      const elapsed = Date.now() - started;
      console.log(
        `HTTP: Response for ${req.urlWithParams}\nreturned with status ${event.status}\nand took ${elapsed} ms`
      );
      console.groupEnd();
    }
  }

  /**
   * Credit: https://angular.io/guide/http#http-interceptors
   */

  /*
  intercept_alternative(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(
            `HTTP: Request for ${req.urlWithParams} took ${elapsed} ms.`
          );
        }
      })
    );
  }
  */
}
