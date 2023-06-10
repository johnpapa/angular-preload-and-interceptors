import { inject } from '@angular/core';
import { SessionService } from '../session.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const deniedMessage = '💂‍♀️ [Guard] - Auth Guard - Unauthorized access denied';

  if (sessionService.isLoggedIn) {
    console.log(`💂‍♀️ [Guard] - Auth Guard - allowed`);
    return true;
  }

  const url = `/signin?redirectTo=${state.url}`;
  const urlTree = router.parseUrl(url);
  router.navigateByUrl(urlTree);
  console.warn(deniedMessage);
  return false;
};

//// CLASS-IC GUARD

// import { Injectable } from '@angular/core';
// import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { SessionService } from '../session.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard  {
//   deniedMessage = '💂‍♀️ [Guard] - Auth Guard - Unauthorized access denied';

//   constructor(private sessionService: SessionService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.sessionService.isLoggedIn) {
//       return true;
//     }
//     this.router.navigate(['/signin'], {
//       queryParams: { redirectTo: state.url },
//     });
//     console.warn(this.deniedMessage);
//     return false;
//   }
// }
