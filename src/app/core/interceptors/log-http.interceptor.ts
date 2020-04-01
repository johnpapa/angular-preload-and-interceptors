import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.group('HTTP: Log Http Traffic');
    let headerList: { key: string; values: string }[] = [];
    req.headers.keys().map(key => {
      headerList.push({ key, values: req.headers.getAll(key).toString() });
    });
    console.log(`${req.method} "${req.urlWithParams}"`);
    console.table(headerList);
    console.groupEnd();
    return next.handle(req);
  }
}
