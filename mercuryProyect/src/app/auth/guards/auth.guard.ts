import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router: Router = inject(Router);

  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    if (!localStorage.getItem('user')) {
      _router.navigate(['/login']);
      return false;
    }
  } else {
    _router.navigate(['/login']);
    return false;
  }

  return true;
};
