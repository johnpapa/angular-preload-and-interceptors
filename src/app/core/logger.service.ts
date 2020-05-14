import { Injectable, Inject } from '@angular/core';

interface LoggingFunction {
  (value: any): void;
}
export interface Logger {
  info: LoggingFunction;
  log: LoggingFunction;
  warn: LoggingFunction;
  error: LoggingFunction;
}

@Injectable({ providedIn: 'root' })
export class LoggerService implements Logger {
  constructor(@Inject('env') private env) {}

  info(value: any): void {
    if (!this.env.production) {
      console.info(value);
    } else {
      // App Insights or your favorite service
    }
  }

  log(value: any): void {
    if (!this.env.production) {
      console.log(value);
      // console.log(`%c${value}`, `color:blue`);
    } else {
      // App Insights or your favorite service
    }
  }

  warn(value: any): void {
    if (!this.env.production) {
      console.warn(value);
    } else {
      // App Insights or your favorite service
    }
  }

  error(value: any): void {
    if (!this.env.production) {
      console.error(value);
    } else {
      // App Insights or your favorite service
    }
  }
}
