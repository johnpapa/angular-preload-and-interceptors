import { inject } from '@angular/core';
import { SessionService } from '../session.service';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { Router } from '@angular/router';

export const authLoadGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const deniedMessage = '💂‍♀️ [Guard] - Auth Guard - Unauthorized access denied';

  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (sessionService.isLoggedIn) {
    console.log(`💂‍♀️ [Guard] - Auth Load Guard - allowed`);
    return true;
  }

  const url = `/signin?redirectTo=/${route.path}`;
  const urlTree = router.parseUrl(url);
  router.navigateByUrl(urlTree);
  console.warn(deniedMessage);
  return sessionService.isLoggedIn;
};
