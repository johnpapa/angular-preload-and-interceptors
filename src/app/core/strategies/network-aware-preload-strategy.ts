import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

export declare var navigator;

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection(route) ? load() : EMPTY;
  }

  hasGoodConnection(route: Route): boolean {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        return false;
      }
      const avoidTheseConnections = ['slow-2g', '2g', '3g' /* ,  '4g' */];
      const effectiveType = conn.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}
