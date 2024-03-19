import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { prefixReq } from './http-config';

@Injectable()
export class LogHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    logRequest(req);
    return next.handle(req);
  }
}

export const LogHeadersFunctionalInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  logRequest(req);
  return next(req);
};

function logRequest(req: HttpRequest<any>) {
  console.groupCollapsed(`${prefixReq} ⚽️ Headers`);
  const headerList: {
    key: string;
    values: string;
  }[] = [];
  req.headers.keys().map((key) => {
    headerList.push({ key, values: req.headers.getAll(key).toString() });
  });
  console.log(`${req.method} "${req.urlWithParams}"`);
  console.table(headerList);
  console.groupEnd();
}
