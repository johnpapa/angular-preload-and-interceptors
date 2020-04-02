import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    this.logRequest(req);
    return next
      .handle(req)
      .pipe(finalize(() => this.logResponse(req, started)));
  }

  private logRequest(req: HttpRequest<any>) {
    console.group('HTTP: Log Http Request');
    let headerList: {
      key: string;
      values: string;
    }[] = [];
    req.headers.keys().map(key => {
      headerList.push({ key, values: req.headers.getAll(key).toString() });
    });
    console.log(`${req.method} "${req.urlWithParams}"`);
    console.table(headerList);
    console.groupEnd();
  }

  private logResponse(req: HttpRequest<any>, started: number) {
    // Log when response observable either completes or errors
    if (event instanceof HttpResponse) {
      console.group('HTTP: Log Http Response');
      const elapsed = Date.now() - started;
      const { ok, status, url, type, statusText, headers } = event;
      const responseInfo = {
        type,
        url,
        ok,
        status,
        statusText,
        headers
      };
      console.log(
        `HTTP: Response for ${req.urlWithParams} took ${elapsed} ms.`
      );
      console.table(responseInfo);
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
