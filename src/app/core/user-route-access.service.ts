import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(private router: Router, private _snackBar: MatSnackBar, private accountService: AccountService, private stateStorageService: StateStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          const authorities = route.data['authorities'];

          if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }

          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }



        }
        this._snackBar.open("Sizga bu bo'limda ishlashga huquq berilmagan!", 'X ', {
          duration: 4000,
          verticalPosition: 'bottom',

        });
        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/login']);
        return false;
      }


      )

    );
  }
}
