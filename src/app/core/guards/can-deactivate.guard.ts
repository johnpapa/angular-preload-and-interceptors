import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate?: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  if (component.canDeactivate()) {
    console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - allowed`);
    return true;
  } else {
    console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - not allowed`);
    return false;
  }
};
